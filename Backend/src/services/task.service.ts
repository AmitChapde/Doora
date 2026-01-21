import Task from "../models/task.model";
import { getIO } from "../socket";
import mongoose, { Types } from "mongoose";
import {
  createTaskInput,
  UpdateTaskInput,
  ReorderTaskInput,
  MoveTaskInput,
} from "../types/task.types";

const createTask = async ({
  title,
  description,
  boardId,
  workspaceId,
  createdBy,
  status,
  order,
}: createTaskInput) => {
  const newTask = await Task.create({
    title,
    description,
    boardId,
    workspaceId,
    createdBy,
    status,
    order,
  });
  return newTask;
};

const getTasksByBoard = async (boardId: string) => {
  const tasks = await Task.find({ boardId });
  return tasks;
};

const updateTask = async (taskId: string, updates: UpdateTaskInput) => {
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { $set: updates },
    {
      new: true, //return updated document
      runValidators: true, //enforce schema rules
    }
  );
  return updatedTask;
};

const deleteTask = async (taskId: string) => {
  const task = await Task.findByIdAndDelete(taskId);
  return task;
};

const reorderTasksInStatus = async ({
  boardId,
  status,
  orderedTaskIds,
  lastKnownUpdatedAt
}: ReorderTaskInput) => {

  //OPTIMISTIC LOCKING  
  const latestTask = await Task.findOne({
    boardId,
    status,
  }).sort({ updatedAt: -1 });

  if (
    latestTask &&
    latestTask.updatedAt.getTime() >
    new Date(lastKnownUpdatedAt).getTime()
  ) {
    throw new Error("Column has changed. Please refresh.");
  }



  //fetch tasks in the board and status
  const tasks = await Task.find({
    boardId,
    status,
  }).select("_id");

  //validate count
  if (tasks.length !== orderedTaskIds.length) {
    throw new Error("Invalid reorder payload");
  }

  //validate same set
  const dbTaskIds = new Set(tasks.map((t) => t._id.toString()));

  for (const taskId of orderedTaskIds) {
    if (!dbTaskIds.has(taskId)) {
      throw new Error("Task doesnot belong to this board/status");
    }
  }

  //Build bulk update
  const bulkOps = orderedTaskIds.map((taskId, index) => ({
    updateOne: {
      filter: {
        _id: new Types.ObjectId(taskId),
        boardId,
        status,
      },
      update: {
        $set: { order: index },
      },
    },
  }));

  await Task.bulkWrite(bulkOps);

  getIO()
    .to(`board:${boardId.toString()}`)
    .emit("task:reordered", {
      boardId: boardId.toString(),
      status,
    });
};

const moveTaskAcrossStatus = async ({
  boardId,
  taskId,
  fromStatus,
  toStatus,
  toIndex,
  fromUpdatedAt,
  toUpdatedAt
}: MoveTaskInput) => {

  const latestFrom = await Task.findOne({
    boardId,
    status: fromStatus,
  }).sort({ updatedAt: -1 });

  if (
    latestFrom &&
    latestFrom.updatedAt.getTime() >
    new Date(fromUpdatedAt).getTime()
  ) {
    throw new Error("Source column has changed. Please refresh.");
  }

  const latestTo = await Task.findOne({
    boardId,
    status: toStatus,
  }).sort({ updatedAt: -1 });

  if (
    latestTo &&
    latestTo.updatedAt.getTime() >
    new Date(toUpdatedAt).getTime()
  ) {
    throw new Error("Destination column has changed. Please refresh.");
  }


  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //fetch the task
    const task = await Task.findOne({
      _id: new Types.ObjectId(taskId),
      boardId,
      status: fromStatus,
    }).session(session);
    if (!task) {
      throw new Error("Task not found in source status");
    }

    //source column:remove task and reorder
    const sourceTasks = await Task.find({
      boardId,
      status: fromStatus,
      _id: { $ne: task._id },
    })
      .sort({ order: 1 })
      .session(session);

    //mapping over every source, filter of that particular task and update its order with index only 
    const sourceBulkOps = sourceTasks.map((t, index) => ({
      updateOne: {
        filter: { _id: t._id },
        update: { $set: { order: index } },
      },
    }));

    if (sourceBulkOps.length) {
      await Task.bulkWrite(sourceBulkOps, { session });
    }

    const destTasks = await Task.find({
      boardId,
      status: toStatus,
    })
      .sort({ order: 1 })
      .session(session);

    if (toIndex < 0 || toIndex > destTasks.length) {
      throw new Error("Invalid destination Index");
    }

    destTasks.splice(toIndex, 0, task);

    const destBulkOps = destTasks.map((t, index) => ({
      updateOne: {
        filter: { _id: t._id },
        update: {
          $set: {
            order: index,
            status: toStatus,
          },
        },
      },
    }));

    await Task.bulkWrite(destBulkOps, { session });
    await session.commitTransaction();

    getIO()
      .to(`board:${boardId.toString()}`)
      .emit("task:moved", {
        taskId,
        fromStatus,
        toStatus,
      });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export {
  createTask,
  getTasksByBoard,
  deleteTask,
  updateTask,
  reorderTasksInStatus,
  moveTaskAcrossStatus,
};
