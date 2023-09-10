import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const secretKey = "thisissomerandomsecret";
const expiry = 24 * 60 * 60 * 1000;

function handleErrors(err) {
	console.log(err.message, err.code);
	let errors = { name: "", email: "", password: "" };

	// Login Errors
	if (err.message === "invalid email") {
		// Enterred email is not valid email
		errors.email = "Please enter a valid email address";
	} else if (err.message === "incorrect email") {
		// incorrect email
		errors.email = "Email is not registered";
	} else if (err.message === "incorrect password") {
		// incorrect password
		errors.password = "Please enter correct password!";
	}

	// Signup Errors
	if (err.name === "ValidationError") {
		// Vaiidation Error
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	if (err.name === "MongoServerError" && err.code === 11000) {
		// duplicate email address
		errors.email = "Email already registered";
	}
	return errors;
}

function createToken(user) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ id: user._id },
			secretKey,
			{ expiresIn: expiry },
			function (err, token) {
				if (err) {
					reject(err);
				} else {
					resolve(token);
				}
			}
		);
	});
}

const userController = {
	getSignup: (req, res) => {
		res.render("signup", { title: "signup" });
	},
	postSignup: async (req, res) => {
		const { name, email, password } = req.body;
		try {
			const user = await User.create({ name, email, password });
			const token = await createToken(user);
			res.cookie("token", token, { maxAge: expiry, httpOnly: true });
			res.status(201).json({ user: user._id });
		} catch (err) {
			const errors = handleErrors(err);
			res.status(400).json({ errors });
		}
	},
	getLogin: (req, res) => {
		res.render("login", { title: "login" });
	},
	postLogin: async (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
		try {
			const user = await User.login(email, password);
			if (user) {
				const token = await createToken(user);
				res.cookie("token", token, { maxAge: expiry, httpOnly: true });
				res.status(200).json({ user: user._id });
			}
		} catch (err) {
			const errors = handleErrors(err);
			res.status(401).json({ errors });
		}
	},
	getUserProfile: async (req, res) => {
		res.render("userProfile.ejs", { title: "profile" });
	},
	getLogout: (req, res) => {
		res.cookie("token", "", { maxAge: 1, httpOnly: true });
		res.redirect("/");
	},
};

export { userController };
