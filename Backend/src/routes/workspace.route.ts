import express from "express";
import { createWorkspaceController } from "../controllers/workspace.controller";
import { protectController } from "../controllers/auth.controller";

const router = express.Router();

router.post("/", protectController, createWorkspaceController);

export default router;
