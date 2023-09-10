import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your name"],
	},
	email: {
		type: String,
		lowercase: true,
		required: [true, "Please enter an email"],
		unique: true,
		validate: {
			validator: isEmail,
			message: "Please enter a valid email",
		},
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minLength: [8, "Password should be minimum 8 characters"],
	},
});

// fire a function before calling save() using pre hook
userSchema.pre("save", async function (next) {
	const saltRounds = 10;
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, saltRounds);
	}
	next();
});

// fire a function after a document is saved
userSchema.post("save", function (doc) {
	console.log({ id: doc._id, email: doc.email });
});

userSchema.static("login", async function (email, password) {
	if (!isEmail(email)) throw new Error("invalid email"); // if email address is not valid
	const user = await this.findOne({ email });
	if (user) {
		const match = await bcrypt.compare(password, user.password);
		if (match) {
			return user;
		} else {
			throw new Error("incorrect password");
		}
	} else {
		throw new Error("incorrect email");
	}
});

const User = mongoose.model("User", userSchema);

export { User };
