import { io, Socket } from "socket.io-client";
import Env from "./env";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(Env.BACKEND_URL);
  }
  return socket;
};

