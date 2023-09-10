import express from "express";
import { userController } from "../controllers/userController.js";
import { checkAuthentication } from "../middleware/authMiddleware.js";
const router = express.Router();

// SIGN UP ROUTES
router.get("/signup", userController.getSignup);
router.post("/signup", userController.postSignup);

// LOGIN ROUTES
router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);

// PROTECTED ROUTES
router.get("/profile", checkAuthentication, userController.getUserProfile);

// LOGOUT ROUTE
router.get("/logout", userController.getLogout);

export { router };
