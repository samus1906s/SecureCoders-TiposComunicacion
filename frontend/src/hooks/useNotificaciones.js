import { useEffect, useState } from "react";

import {
    obtenerNotificacionLongPolling,
    crearConexionSSE
} from "../services/notificacion.service.js";

export default function useNotificaciones(
    tipoConexion = "ninguna"
) {

    const [notificaciones, setNotificaciones] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        /*
         * Permite saber si el usuario todavía
         * se encuentra en la página.
         */
        let componenteActivo = true;

        /*
         * Aquí se guardará la función que cierra SSE.
         */
        let cerrarConexionSSE = null;

        /*
         * Se utiliza si Long Polling falla y debe
         * intentar conectarse nuevamente.
         */
        let temporizadorReintento = null;

        /*
         * =====================================================
         *                    LONG POLLING
         * =====================================================
         */

        async function iniciarLongPolling() {

            try {

                setError("");

                /*
                  Llama al service y espera la respuesta
                  del backend.
                 */
                const respuesta = await obtenerNotificacionLongPolling();

                
                if (!componenteActivo) {
                    return;
                }

                
                if (respuesta?.data) {

                    setNotificaciones((anteriores) => [
                        ...anteriores,
                        respuesta.data
                    ]);

                }

                /*
                 Después de recibir una respuesta,
                 se inicia otra petición Long Polling.
                 */
                if (componenteActivo) {
                    iniciarLongPolling();
                }

            } catch (errorLongPolling) {

                if (!componenteActivo) {
                    return;
                }

                setError(
                    errorLongPolling.message ||
                    "Error con Long Polling."
                );

                /*
                  Espera dos segundos antes de volver
                  a intentar la conexión.
                 */
                temporizadorReintento = setTimeout(() => {

                    if (componenteActivo) {
                        iniciarLongPolling();
                    }

                }, 2000);

            }

        }

        /*
         =====================================================
                         SERVER-SENT EVENTS
         =====================================================
         */

        function iniciarSSE() {

            setCargando(true);
            setError("");

            /*
             El service crea la conexión EventSource.
             */
            const fuenteEventos = crearConexionSSE();

            /*
             Se ejecuta cuando la conexión SSE
             se abre correctamente.
             */
            fuenteEventos.onopen = () => {

                if (!componenteActivo) {
                    return;
                }

                setCargando(false);
                setError("");

            };

            /*
             Se ejecuta cada vez que el backend
             envía un evento.
             */
            fuenteEventos.onmessage = (evento) => {

                if (!componenteActivo) {
                    return;
                }

                try {

                    const nuevaNotificacion =
                        JSON.parse(evento.data);

                    /*
                     El backend envía primero un mensaje
                     indicando que la conexión fue abierta.
                     
                     Ese mensaje no representa una solicitud,
                     por eso no se agrega al panel.
                     */
                    if (nuevaNotificacion.tipo === "conexion") {
                        return;
                    }

                    setNotificaciones((anteriores) => [
                        ...anteriores,
                        nuevaNotificacion
                    ]);

                } catch {

                    setError(
                        "La notificación recibida no tiene un formato válido."
                    );

                }

            };

            /*
              Se ejecuta si ocurre un error en SSE.
             */
            fuenteEventos.onerror = () => {

                if (!componenteActivo) {
                    return;
                }

                setCargando(false);

                setError(
                    "Ocurrió un error en la conexión SSE."
                );

            };

            /*
              Devuelve una función para cerrar SSE.
             */
            return () => {

                fuenteEventos.close();

            };

        }

        /*
         * Se selecciona una sola comunicación.
         */

        if (tipoConexion === "long-polling") {
            iniciarLongPolling();
        }

        if (tipoConexion === "sse") {
            cerrarConexionSSE = iniciarSSE();
        }

        return () => {

            componenteActivo = false;

            if (temporizadorReintento) {
                clearTimeout(temporizadorReintento);
            }

            if (cerrarConexionSSE) {
                cerrarConexionSSE();
            }

        };

    }, [tipoConexion]);

    return {
        notificaciones,
        cargando,
        error
    };

}