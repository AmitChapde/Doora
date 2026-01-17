import { IUser } from "./user.types";
import { IBoard } from "./board.types";
import { BoardRole } from "./role.types";
import { Types } from "mongoose";
import { ITask } from "./task.types";
import { IWorkspacemember } from "./workspacemember.types";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      board?: IBoard;
      workspaceId?: Types.ObjectId;
      memberRole?: BoardRole;
      task: ITask;
      workspaceMember?: IWorkspacemember;
    }
  }
}

export {};
