import { Document, Types } from "mongoose";

export interface IActivity extends Document {
    boardId: Types.ObjectId,
    workspaceId: Types.ObjectId,
    actorId: Types.ObjectId,
    type: "TASK_CREATED" |
    "TASK_MOVED" |
    "TASK_REORDERED" |
    "TASK_UPDATED",
    entityId: Types.ObjectId,
    metadata:Record<string, any>,
    createdAt:string

}

export interface CreateActivityInput {
    boardId: Types.ObjectId;
    workspaceId: Types.ObjectId;
    actorId: Types.ObjectId;
    type: string;
    entityId: Types.ObjectId;
    metadata?: Record<string, any>;
    session?: any;
}