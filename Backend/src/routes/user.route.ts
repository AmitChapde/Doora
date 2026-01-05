import express from "express";
import { Router } from "express";

import {
  getAllUsersController,
  getUserByIdController,
} from "../controllers/user.controller";
import { protectController } from "../controllers/auth.controller";


const router = Router();

router.get("/",protectController,getAllUsersController);
router.get("/:id", getUserByIdController);


export default router;