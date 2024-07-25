import express from "express";
import { validation } from "../../middleware/validation.js";
import { signup ,signin ,changePassword, protectdRoutes} from "./auth.controller.js";
import { checkEmail } from "../../middleware/emailExist.js";
import {signupVal ,signinVal ,changePasswordVal} from "./auth.validation.js";
const authRouter = express.Router();
authRouter.post("/signup", validation(signupVal), checkEmail, signup);

authRouter.post("/signin", validation(signinVal), signin);
authRouter.patch("/changepassword", protectdRoutes ,validation(changePasswordVal), changePassword);



export default authRouter;