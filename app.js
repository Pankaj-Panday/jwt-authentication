// import dotenv from "dotenv";
// dotenv.config();

import express from "express";
import { URL, fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connect.js";
import { router as userRouter } from "./routes/userRouter.js";
import { checkAuthentication, checkUser } from "./middleware/authMiddleware.js";
import ejs from "ejs";

const app = express();
const staticDir = fileURLToPath(new URL("public", import.meta.url));

// Connect DB and Server setup
const port = process.env.PORT || 3000;
connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server started on port: ${port}`);
		});
	})
	.catch((err) => console.log(err));

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(staticDir));
app.use("/user", express.static(staticDir));

// using ejs for rendering;
app.set("view engine", "ejs");

// all routes
app.use("*", checkUser);

// Home route
app.get("/", (req, res) => {
	res.render("home", { title: "home" });
});

// custom routes
app.use("/user", userRouter);
