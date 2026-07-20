import { io } from "socket.io-client";

const URL_BACKEND = "http://localhost:3000";

const socket = io(URL_BACKEND);

export function obtenerSocket() {
    return socket;
}

export function enviarMensaje(datos) {
    socket.emit("mensaje", datos);
}

export function enviarTyping(usuario) {
    socket.emit("typing", usuario);
}