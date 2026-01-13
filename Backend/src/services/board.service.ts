import Board from "../models/board.model";
import { CreateBoardInput } from "../types/board.types";

const createBoard = async ({
  name,
  workspaceId,
  type,
  createdBy,
}: CreateBoardInput) => {
  const newBoard = await Board.create({ name, workspaceId, type, createdBy });

  return newBoard;
};

const getBoardsByWorkspace = async (workspaceId: string) => {
  const users = await Board.find({ workspaceId });
  return users;
};

const getBoardById = async (boardId: string) => {
  const user = await Board.findById(boardId);
  return user;
};

const deleteBoardById = async (boardId: string) => {
  await Board.findByIdAndDelete(boardId);
}

export { createBoard, getBoardsByWorkspace, getBoardById ,deleteBoardById};
