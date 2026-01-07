import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  resetPasswordController,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);
router.patch("/reset-password/:token", resetPasswordController);

export default router;
