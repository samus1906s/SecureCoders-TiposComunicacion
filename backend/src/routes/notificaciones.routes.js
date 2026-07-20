import { Router } from "express";

import {obtenerLongPolling} from "../controllers/longPolling.controller.js";

import {conectarSSE} from "../controllers/sse.controller.js";

const router = Router();

router.get("/long-polling",obtenerLongPolling);

router.get("/eventos",conectarSSE);

export default router;