import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { ExtendedError } from "socket.io/dist/namespace";

export const socketAuth = (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string; email: string };

    // attach authenticated user to socket
    socket.data.user = decoded;

    next();
  } catch (err) {
    next(new Error("Invalid or expired token"));
  }
};
