import eventBus from "../utils/eventBus.js";

export function conectarSSE(req, res) {

    /*
     * Estos encabezados indican que la respuesta
     * será una conexión SSE.
     */
    res.setHeader(
        "Content-Type",
        "text/event-stream"
    );

    res.setHeader(
        "Cache-Control",
        "no-cache"
    );

    res.setHeader(
        "Connection",
        "keep-alive"
    );

    /*
     * Envía los encabezados inmediatamente.
     */
    res.flushHeaders();

    /*
     * Envía un primer mensaje para confirmar
     * que la conexión fue establecida.
     */
    res.write(
        `data: ${JSON.stringify({
            tipo: "conexion",
            mensaje: "Conexión SSE establecida."
        })}\n\n`
    );

    function enviarNotificacion(tipoEvento, datos) {

        const notificacion = crearNotificacion(
            tipoEvento,
            datos
        );

        /*
         * En SSE, cada mensaje comienza con data:
         * y termina con dos saltos de línea.
         */
        res.write(
            `data: ${JSON.stringify(notificacion)}\n\n`
        );

    }

    function manejarSolicitudCreada(datos) {

        enviarNotificacion(
            "solicitud:creada",
            datos
        );

    }

    function manejarSolicitudActualizada(datos) {

        enviarNotificacion(
            "solicitud:actualizada",
            datos
        );

    }

    function manejarSolicitudCancelada(datos) {

        enviarNotificacion(
            "solicitud:cancelada",
            datos
        );

    }

    /*
     * SSE puede recibir muchos eventos durante
     * la misma conexión, por eso usamos on.
     */
    eventBus.on(
        "solicitud:creada",
        manejarSolicitudCreada
    );

    eventBus.on(
        "solicitud:actualizada",
        manejarSolicitudActualizada
    );

    eventBus.on(
        "solicitud:cancelada",
        manejarSolicitudCancelada
    );

    /*
     * Cuando el cliente cierre la conexión,
     * eliminamos los listeners.
     */
    req.on("close", () => {

        eventBus.removeListener(
            "solicitud:creada",
            manejarSolicitudCreada
        );

        eventBus.removeListener(
            "solicitud:actualizada",
            manejarSolicitudActualizada
        );

        eventBus.removeListener(
            "solicitud:cancelada",
            manejarSolicitudCancelada
        );

        res.end();

    });

    function crearNotificacion(tipoEvento, datos) {

        if (tipoEvento === "solicitud:creada") {

            return {
                solicitudId: datos.id,
                estado: datos.estado,
                mensaje: "Se creó una nueva solicitud.",
                fecha: new Date().toISOString()
            };

        }

        if (tipoEvento === "solicitud:actualizada") {

            return {
                solicitudId: datos.id,
                estado: datos.estado,
                mensaje: "Se actualizó una solicitud.",
                fecha: new Date().toISOString()
            };

        }

        if (tipoEvento === "solicitud:cancelada") {

            return {
                solicitudId: datos.id,
                estado: "cancelada",
                mensaje: "La solicitud fue cancelada.",
                fecha: new Date().toISOString()
            };

        }

        return {
            solicitudId: datos.id,
            estado: "desconocido",
            mensaje: "Ocurrió un cambio en la solicitud.",
            fecha: new Date().toISOString()
        };

    }

}



