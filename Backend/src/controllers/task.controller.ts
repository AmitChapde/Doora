import mongoose from "mongoose";
import { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getTasksByBoard,
  updateTask,
  reorderTasksInStatus,
  moveTaskAcrossStatus,
} from "../services/task.service";


const createTaskController = async (req: Request, res: Response) => {
  try {
    const { title, description, status, order } = req.body;

    const { boardId } = req.params;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!req.workspaceId) {
      res.status(400).json({ message: "Workspace context missing" });
      return;
    }

    const newTask = await createTask({
      title,
      description,
      status,
      order,
      boardId: new mongoose.Types.ObjectId(boardId),
      workspaceId: req.workspaceId,
      createdBy: req.user.id,
      userId: req.user.id,
    });
    res.status(201).json({
      status: "success",
      data: {
        newTask,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

const getTasksByBoardController = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const tasks = await getTasksByBoard(boardId);
    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting Tasks" });
  }
};

const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const updatedTask = await updateTask(taskId, updates, req.user!.id);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      status: "success",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    await deleteTask(taskId);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

const reorderTasksInStatusController = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const { status, orderedTaskIds, lastKnownUpdatedAt } = req.body;

    if (!status || !orderedTaskIds?.length || !lastKnownUpdatedAt) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    await reorderTasksInStatus({
      boardId: new mongoose.Types.ObjectId(boardId),
      status,
      orderedTaskIds,
      lastKnownUpdatedAt,
      userId: req.user!.id,
    });

    return res.status(200).json({
      status: "success",
      message: "Tasks reordered successfully",
    });
  } catch (error: any) {
    if (error.message.includes("changed")) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(400).json({ message: error.message });
  }
};

const moveTaskAcrossStatusController = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const { taskId, fromStatus, toStatus, toIndex, fromUpdatedAt, toUpdatedAt } = req.body;


    if (!fromUpdatedAt || !toUpdatedAt) {
      return res.status(400).json({ message: "Missing column timestamps" });

    }

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await moveTaskAcrossStatus({
      boardId: new mongoose.Types.ObjectId(boardId),
      taskId,
      fromStatus,
      toStatus,
      toIndex,
      fromUpdatedAt,
      toUpdatedAt,
      userId: req.user!.id,
    });


    return res.status(200).json({
      message: "Task moved successfully",
    });
  } catch (error: any) {
    if (error.message.includes("changed")) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(400).json({ message: error.message });
  }
};
export {
  createTaskController,
  getTasksByBoardController,
  updateTaskController,
  deleteTaskController,
  reorderTasksInStatusController,
  moveTaskAcrossStatusController
};
