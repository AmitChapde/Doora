import { Request, Response } from "express";
import Activity from "../models/activity.model";

const getBoardActivitiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { boardId } = req.params;

    const activities = await Activity.find({ boardId })
      .populate("actorId", "name email")
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      status: "success",
      data: {
        activities,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities" });
  }
};

export { getBoardActivitiesController };
