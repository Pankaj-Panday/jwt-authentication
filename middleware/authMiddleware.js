import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
const secretKey = process.env.JWT_SECRET;

const checkAuthentication = (req, res, next) => {
	const token = req.cookies.token;
	if (token) {
		jwt.verify(token, secretKey, function (err, decoded) {
			if (err) {
				console.log(err.message);
				res.redirect("/user/login");
			} else {
				// console.log(decoded);
				next();
			}
		});
	} else {
		res.redirect("/user/login");
	}
};

const checkUser = (req, res, next) => {
	const token = req.cookies.token;
	if (token) {
		jwt.verify(token, secretKey, async function (err, decoded) {
			if (err) {
				res.locals.user = null;
				next();
			} else {
				res.locals.user = await User.findById(decoded.id);
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

export { checkAuthentication, checkUser };
