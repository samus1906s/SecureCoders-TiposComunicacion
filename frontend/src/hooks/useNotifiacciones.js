import { useEffect, useState } from "react";

export default function useNotificaciones(tipoConexion = "ninguna") {

  
    const [notificaciones, setNotificaciones] = useState([]);

 
    const [cargando, setCargando] = useState(false);


    const [error, setError] = useState("");

    useEffect(() => {

        /*
         * Esta variable permite saber si el usuario
         * todavía se encuentra en la página.
         */
        let componenteActivo = true;

        /*
         * Aquí se guardará la función encargada
         * de cerrar la conexión SSE.
         */
        let cerrarConexionSSE = null;

      

        async function iniciarLongPolling() {
             /*
            Pendiente por que no tengo la parte del backend
            */

        }


        function iniciarSSE() {
            /*
            Pendiente por que no tengo la parte del backend
            */

        }

        /*
         * ver la comunicación qu esta por el backend no esta.
         *
         * porque todavía no está conectado el backend.
         */

        if (tipoConexion === "long-polling") {
            iniciarLongPolling();
        }

        if (tipoConexion === "sse") {
            cerrarConexionSSE = iniciarSSE();
        }

        /*
          Esta función se ejecuta cuando el usuario
          abandona la página de notificaciones.
         */
        return () => {

            componenteActivo = false;

            if (cerrarConexionSSE) {
                cerrarConexionSSE();
            }

        };

    }, [tipoConexion]);

    /*
      Estos son los datos que podrá utilizar
      la página Notificaciones.jsx.
     */
    return {
        notificaciones,
        cargando,
        error
    };

}