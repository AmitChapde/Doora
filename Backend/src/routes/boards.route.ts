import express from "express";
import {
  getBoardByIdController,
  createBoardController,
  getBoardsByWorkspaceController,
  deleteBoardByIdController,
} from "../controllers/board.controller";
import {
  protectController,
  restrictToController,
} from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/workspaces/:workspaceId/boards",
  protectController,
  restrictToController("ADMIN"),
  createBoardController
);

router.get(
  "/workspaces/:workspaceId/boards",
  protectController,
  restrictToController("ADMIN", "EDITOR", "VIEWER"),
  getBoardsByWorkspaceController
);

router.get("/boards/:boardId", protectController, getBoardByIdController);

// router.delete(
//   "/boards/:boardId",
//   protectController,
//   deleteBoardByIdController
// );
export default router;
