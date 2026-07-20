import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";

dotenv.config();

import solicitudRoutes from "./routes/solicitud.routes.js";
import notificacionesRoutes from "./routes/notificaciones.routes.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { initializeSocket } from "./socket/socket.js";
import { iniciarMailService } from "./services/mail.service.js";

const NAME = process.env.SERVER_NAME;
const PORT = process.env.SERVER_PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.json({
    nombre: NAME,
    estado: "Servidor funcionando correctamente"
  });
});

app.use("/solicitudes", solicitudRoutes);

app.use("/notificaciones",notificacionesRoutes)

const server = http.createServer(app);

initializeSocket(server);
iniciarMailService();

server.listen(PORT, () => {
  console.log(`${NAME} ejecutándose en http://localhost:${PORT}`);
});