import PanelNotificaciones from "../components/PanelNotificaciones";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

import useNotificaciones from "../hooks/useNotifiacciones";

export default function Notificaciones() {

    const {
        notificaciones,
        cargando,
        error
    } = useNotificaciones();

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
                    Consulta los cambios realizados en las solicitudes de soporte.
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
                notificaciones={notificaciones}
            />

        </main>
    );

}