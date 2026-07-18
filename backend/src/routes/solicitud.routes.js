import { Router } from "express";
import { agregarSolicitud } from "../controllers/solicitud.controller.js";
import { obtenerSolicitudes } from "../controllers/solicitud.controller.js";
import { obtenerSolicitudPorId } from "../controllers/solicitud.controller.js";
import { actualizarSolicitud } from "../controllers/solicitud.controller.js";
import { eliminarSolicitud } from "../controllers/solicitud.controller.js";

const router = Router();

router.post("/", agregarSolicitud);
router.get("/", obtenerSolicitudes);
router.get("/:id", obtenerSolicitudPorId);
router.put("/:id", actualizarSolicitud);
router.delete("/:id", eliminarSolicitud);

export default router;