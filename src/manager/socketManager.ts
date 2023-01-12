import io, {Socket} from 'socket.io-client';
import {createContext} from "react";
export const socket: Socket = io("https://sket.chipirones.club");
export const SocketContext = createContext(socket);
