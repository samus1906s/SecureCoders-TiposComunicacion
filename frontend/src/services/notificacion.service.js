const URL_BACKEND = "http://localhost:3000";

/*
 * Solicita una notificación mediante Long Polling.
 *
 * El servidor mantendrá la petición abierta hasta
 * que exista una nueva notificación o finalice
 * el tiempo de espera.
 */
export async function obtenerNotificacionLongPolling() {

    const respuesta = await fetch(
        `${URL_BACKEND}/long-polling`
    );

    if (!respuesta.ok) {

        throw new Error(
            "No se pudo tener por Long Polling."
        );

    }

    return await respuesta.json();

}

/*
  eventos enviados
  desde el servidor mediante SSE.
 */
export function crearConexionSSE() {

    const fuenteEventos = new EventSource(
        `${URL_BACKEND}/eventos`
    );

    return fuenteEventos;

}