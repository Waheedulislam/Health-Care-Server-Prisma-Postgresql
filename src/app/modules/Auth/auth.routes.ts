import express from "express";
import { authController } from "./auth.controller";
import { auth } from "../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router = express.Router();

router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  authController.changePassword
);

// forget password and send email
router.post("/forget-password", authController.forgetPassword);
// after send forget email then reset password
router.post("/reset-password", authController.resetPassword);

export const AuthRoutes = router;
