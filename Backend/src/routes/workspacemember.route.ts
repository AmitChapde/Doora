import express from "express";
import { protectController } from "../controllers/auth.controller";
import { getWorkspaceMembersByWorkspaceIdController, inviteWorkspaceMemberController } from "../controllers/workspacemember.controller";
import { restrictToController } from "../controllers/auth.controller";

const router = express.Router();

router.get(
  "/:workspaceId/members",
  protectController,
  restrictToController("ADMIN", "EDITOR"),
  getWorkspaceMembersByWorkspaceIdController
);

router.post(
  "/:workspaceId/members",
  protectController,
  restrictToController("ADMIN"),
  inviteWorkspaceMemberController
);

export default router;
