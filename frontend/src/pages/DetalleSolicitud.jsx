import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../components/loading";
import Alert from "../components/alert";
import Badge from "../components/badge";
import Button from "../components/button";

import { obtenerSolicitudPorId } from "../services/solicitud.service.js";

const INTERVALO_POLLING = 10000; // 10 segundos

export default function DetalleSolicitud() {

    const { id } = useParams();

    const [solicitud, setSolicitud] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [huboCambio, setHuboCambio] = useState(false);
    const [ultimaConsulta, setUltimaConsulta] = useState(null);

    // guarda la última respuesta para poder compararla con la nueva
    // sin depender del ciclo de renders de React (evita closures viejos dentro del setInterval)
    const solicitudAnteriorRef = useRef(null);

    async function consultarSolicitud() {

        try {

            const datos = await obtenerSolicitudPorId(id);

            if (!datos || datos.error) {
                setError(datos?.error || "Solicitud no encontrada.");
                return;
            }

            const anterior = solicitudAnteriorRef.current;

            const cambioDetectado =
                anterior !== null &&
                JSON.stringify(anterior) !== JSON.stringify(datos);

            solicitudAnteriorRef.current = datos;

            setSolicitud(datos);
            setError(null);
            setUltimaConsulta(new Date());

            if (cambioDetectado) {
                setHuboCambio(true);
                setTimeout(() => setHuboCambio(false), 4000);
            }

        } catch (err) {

            console.error(err);
            setError("No se pudo conectar con el servidor.");

        } finally {

            setCargando(false);

        }

    }

    useEffect(() => {

        // primera consulta inmediata al entrar a la pantalla
        consultarSolicitud();

        // luego, se repite automáticamente cada 10 segundos (polling)
        const intervalId = setInterval(() => {
            consultarSolicitud();
        }, INTERVALO_POLLING);

        // se limpia el intervalo al salir de la pantalla para no dejarlo corriendo
        return () => clearInterval(intervalId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (cargando) return <Loading />;

    if (error && !solicitud) {
        return (
            <div className="container mt-4 detalle-solicitud">
                <Alert tipo="danger" mensaje={error} />
            </div>
        );
    }

    if (!solicitud) return null;

    return (

        <div className="container mt-4 detalle-solicitud">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h3 className="mb-0">
                    Solicitud #{solicitud.id}
                </h3>

                <Button
                    texto="Actualizar ahora"
                    tipo="outline-primary"
                    boton="button"
                    onClick={consultarSolicitud}
                />

            </div>

            {
                huboCambio &&
                <Alert
                    tipo="info"
                    mensaje="Se detectó un cambio en esta solicitud. La información se actualizó automáticamente."
                />
            }

            {
                error &&
                <Alert
                    tipo="warning"
                    mensaje={`${error} Mostrando la última información disponible.`}
                />
            }

            <div className="card shadow-sm">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <h5 className="mb-0">
                            {solicitud.asunto}
                        </h5>

                        <Badge estado={solicitud.estado} />

                    </div>

                    <p>
                        <strong>Cliente: </strong>
                        {solicitud.nombreCliente}
                    </p>

                    <p>
                        <strong>Correo: </strong>
                        {solicitud.correo}
                    </p>

                    <p>
                        <strong>Descripción: </strong>
                        {solicitud.descripcion || "Sin descripción."}
                    </p>

                    <p>
                        <strong>Creada: </strong>
                        {new Date(solicitud.fechaCreacion).toLocaleString()}
                    </p>

                    <p className="mb-0">
                        <strong>Última actualización: </strong>
                        {new Date(solicitud.fechaActualizacion).toLocaleString()}
                    </p>

                </div>

            </div>

            <p
                className="text-muted mt-3"
                style={{ fontSize: "var(--texto-sm)" }}
            >
                Verificando cambios automáticamente cada 10 segundos.
                {ultimaConsulta && ` Última consulta: ${ultimaConsulta.toLocaleTimeString()}`}
            </p>

        </div>

    );

}