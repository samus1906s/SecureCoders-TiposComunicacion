import PanelNotificaciones
    from "../components/panelNotificaciones.jsx";

import Loading
    from "../components/loading.jsx";

import Alert
    from "../components/alert.jsx";


export default function Notificaciones({

// Los Dtaos se van a recibir desde el App.jsx
    notificaciones = [],
    cargando = false,
    error = ""

}) {

    if (cargando) {

        return (

            <main className="contenedor">

                <Loading />

            </main>

        );

    }


    return (

        <main className="contenedor">

            <div className="mb-4">

                <h2>

                    Notificaciones del sistema

                </h2>

                <p className="text-muted">

                    Consulta los cambios realizados
                    en las solicitudes de soporte.

                </p>

            </div>


            {
                error && (

                    <Alert
                        tipo="danger"
                        mensaje={error}
                    />

                )
            }


            <PanelNotificaciones

                notificaciones={
                    notificaciones
                }

            />

        </main>

    );

}