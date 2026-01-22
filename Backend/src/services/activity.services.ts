import Activity from "../models/activity.model";
import { CreateActivityInput } from "../types/activity.types";
import { getIO } from "../socket";


const createActivity = async ({
    boardId,
    workspaceId,
    actorId,
    type,
    entityId,
    metadata = {},
    session,
}: CreateActivityInput) => {
    const activityData = {
        boardId,
        workspaceId,
        actorId,
        type,
        entityId,
        metadata,
    };

    let activity;

    if (session) {
        const result = await Activity.create([activityData], { session });
        activity = result[0];
    } else {
        activity = await Activity.create(activityData);
    }

    getIO()
        .to(`board:${boardId.toString()}`)
        .emit("activity:created", {
            _id: activity._id,
            type: activity.type,
            entityId: activity.entityId,
            metadata: activity.metadata,
            actorId: activity.actorId,
            createdAt: activity.createdAt,
        });

    return activity;
};


export { createActivity }