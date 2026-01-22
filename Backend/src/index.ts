import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import { initSocket } from "./socket";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import workspaceRoutes from "./routes/workspace.route";
import workspaceMemberRoutes from "./routes/workspacemember.route";
import boardRoutes from "./routes/boards.route";
import taskRoutes from "./routes/task.route";
import commentRoutes from "./routes/comments.route";
import activityRoutes from "./routes/activity.routes";


dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/workspaces", workspaceRoutes);
app.use("/api/v1/workspaces", workspaceMemberRoutes);
app.use("/api/v1", boardRoutes);
app.use("/api/v1", taskRoutes);
app.use("/api/v1", commentRoutes);
app.use("/api/v1", activityRoutes);

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => {
  console.log("Server running");
});

initSocket(server)
