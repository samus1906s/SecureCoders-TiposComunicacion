
/*
 * Solicita una notificación mediante Long Polling.
 *
 * El servidor mantendrá la petición abierta hasta
 * que exista una nueva notificación o finalice
 * el tiempo de espera.
 */
const URL_BACKEND =
    "http://localhost:3000/notificaciones";

export async function obtenerNotificacionLongPolling() {

    const respuesta = await fetch(
        `${URL_BACKEND}/long-polling`
    );

    if (respuesta.status === 204) {
        return null;
    }

    if (!respuesta.ok) {

        throw new Error(
            "No fue posible obtener la notificación mediante Long Polling."
        );

    }

    return await respuesta.json();

}

export function crearConexionSSE() {

    return new EventSource(
        `${URL_BACKEND}/eventos`
    );

}