import nodemailer from "nodemailer";
import eventBus from "../utils/eventBus.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

function obtenerAsunto(tipoEvento, estado) {
    switch (tipoEvento) {
        case "solicitud:creada":
            return "Solicitud recibida correctamente";
        case "solicitud:cancelada":
            return "Solicitud cancelada";
        case "solicitud:actualizada":
            return `Solicitud actualizada - ${estado || "Nuevo Estado"}`;
        default:
            return "Actualización de solicitud";
    }
}

async function generarHTML(tipoEvento, datos) {
    const enlaceSolicitud = `http://localhost:5173/solicitud/${datos.id}`;
    let nombreArchivo = "";

    if (tipoEvento === "solicitud:creada") {
        nombreArchivo = "solicitudCreada.html";
    } else if (tipoEvento === "solicitud:cancelada") {
        nombreArchivo = "SolicitudCancelada.html";
    } else {

        const estado = (datos.estado || "").toLowerCase();
        if (estado.includes("asigna")) {
            nombreArchivo = "solicitudAsignada.html";
        } else if (estado.includes("finaliza") || estado.includes("termina")) {
            nombreArchivo = "solicitudFinalizada.html";
        } else {
            nombreArchivo = "solicitudProceso.html";
        }
    }

    const rutaTemplate = path.join(__dirname, "..", "templates", nombreArchivo);

    let htmlContent = await fs.readFile(rutaTemplate, "utf-8");

    htmlContent = htmlContent
        .replace(/{{id}}/g, datos.id || "")
        .replace(/{{nombreCliente}}/g, datos.nombreCliente || "")
        .replace(/{{asunto}}/g, datos.asunto || "")
        .replace(/{{estado}}/g, datos.estado || "")
        .replace(/{{enlaceSolicitud}}/g, enlaceSolicitud);

    return htmlContent;
}

async function enviarCorreo(tipoEvento, datos) {
    try {
        const contenidoHTML = await generarHTML(tipoEvento, datos);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: datos.correo,
            subject: obtenerAsunto(tipoEvento, datos.estado),
            html: contenidoHTML
        });

        console.log(`Correo enviado a ${datos.correo}`);
    } catch (error) {
        console.error("Error enviando correo:", error.message);
    }
}

export function iniciarMailService() {
    eventBus.on(
        "solicitud:creada",
        (datos) => enviarCorreo("solicitud:creada", datos)
    );

    eventBus.on(
        "solicitud:actualizada",
        (datos) => enviarCorreo("solicitud:actualizada", datos)
    );

    eventBus.on(
        "solicitud:cancelada",
        (datos) => enviarCorreo("solicitud:cancelada", datos)
    );

    console.log("Servicio de correos iniciado con plantillas HTML.");
}