import eventBus from "../utils/eventBus.js";

const tiempoEspera = 25000;

export function obtenerLongPolling(req, res) {

    
    let peticionTerminada = false;

    
    let temporizador;

    
    function limpiarRecursos() {

        clearTimeout(temporizador);

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

    }

    /*
      Prepara y envía la notificación al frontend.
     */
    function enviarNotificacion(tipoEvento, datos) {

        if (peticionTerminada) {
            return;
        }

       
        peticionTerminada = true;

        limpiarRecursos();

        const notificacion = crearNotificacion(
            tipoEvento,
            datos
        );

        return res.status(200).json({
            success: true,
            message: "Nueva notificación recibida.",
            data: notificacion
        });

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
      La petición espera uno de estos eventos.
      once significa que cada listener se ejecutará
      una sola vez.
     */
    eventBus.once(
        "solicitud:creada",
        manejarSolicitudCreada
    );

    eventBus.once(
        "solicitud:actualizada",
        manejarSolicitudActualizada
    );

    eventBus.once(
        "solicitud:cancelada",
        manejarSolicitudCancelada
    );

    /*
     Si no ocurre ningún evento durante 25 segundos,
     la petición finaliza sin contenido.
     */
    temporizador = setTimeout(() => {

        if (peticionTerminada) {
            return;
        }

        peticionTerminada = true;

        limpiarRecursos();

        return res.status(204).end();

    }, tiempoEspera);

    /*
     Se ejecuta si el cliente cierra o cancela
     la conexión antes de recibir una respuesta.
     */
    req.on("close", () => {

        if (peticionTerminada) {
            return;
        }

        peticionTerminada = true;

        limpiarRecursos();

    });

    /*
     Convierte los eventos al mismo formato
     que necesita el frontend.
     */
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