import { Server } from "socket.io";
import eventBus from "../utils/eventBus.js";

let io = null;

export const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {

        console.log(`Cliente conectado: ${socket.id}`);

        socket.on("mensaje", (data) => {

            console.log("Mensaje recibido:", data);

            io.emit("mensaje", data);

        });

        socket.on("typing", (usuario) => {

            socket.broadcast.emit("typing", usuario);

        });

        socket.on("disconnect", () => {

            console.log(`Cliente desconectado: ${socket.id}`);

        });

    });

    eventBus.on("solicitud:creada", (datos) => {

        io.emit("notificacion", {
            tipo: "solicitud:creada",
            datos
        });

    });

    eventBus.on("solicitud:actualizada", (datos) => {

        io.emit("notificacion", {
            tipo: "solicitud:actualizada",
            datos
        });

    });

    eventBus.on("solicitud:cancelada", (datos) => {

        io.emit("notificacion", {
            tipo: "solicitud:cancelada",
            datos
        });

    });

};

export const getIO = () => io;