import Badge from "./badge";

export default function ItemNotificacion ({
    solicitudId,
    estado,
    mensaje,
    fecha
}) {

    return (
        <div className="notificacion">

            <div className="d-flex justify-content-between align-items-center">

                <strong>
                    Solicitud #{solicitudId}
                </strong>

                <Badge estado={estado} />

            </div>

            <p className="mt-2 mb-1">
                {mensaje}
            </p>

            <small className="text-muted">

                {fecha}

            </small>

        </div>
    );
}

