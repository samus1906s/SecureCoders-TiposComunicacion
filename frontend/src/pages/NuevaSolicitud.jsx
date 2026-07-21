import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../components/input";
import Textarea from "../components/textarea";
import Button from "../components/button";
import Alert from "../components/alert";

import { agregarSolicitud } from "../services/solicitud.service.js";

const SOLICITUD_VACIA = {
    nombreCliente: "",
    correo: "",
    asunto: "",
    descripcion: ""
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NuevaSolicitud() {

    const [solicitud, setSolicitud] = useState(SOLICITUD_VACIA);
    const [errores, setErrores] = useState({});
    const [enviando, setEnviando] = useState(false);
    const [errorServidor, setErrorServidor] = useState("");
    const [solicitudCreada, setSolicitudCreada] = useState(null);

    function handleChange(e) {
        setSolicitud({
            ...solicitud,
            [e.target.name]: e.target.value
        });
    }

    function validar() {
        const nuevosErrores = {};

        if (!solicitud.nombreCliente.trim()) {
            nuevosErrores.nombreCliente = "El nombre del cliente es obligatorio.";
        }

        if (!solicitud.correo.trim()) {
            nuevosErrores.correo = "El correo es obligatorio.";
        } else if (!EMAIL_REGEX.test(solicitud.correo)) {
            nuevosErrores.correo = "El correo no tiene un formato válido.";
        }

        if (!solicitud.asunto.trim()) {
            nuevosErrores.asunto = "El asunto es obligatorio.";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setErrorServidor("");
        setSolicitudCreada(null);

        if (!validar()) return;

        setEnviando(true);

        try {
            const respuesta = await agregarSolicitud(solicitud);

            if (respuesta?.error) {
                setErrorServidor(respuesta.error);
                return;
            }

            setSolicitudCreada(respuesta);
            setSolicitud(SOLICITUD_VACIA);
            setErrores({});
        } catch (err) {
            console.error(err);
            setErrorServidor("No se pudo conectar con el servidor.");
        } finally {
            setEnviando(false);
        }
    }

    function crearOtra() {
        setSolicitudCreada(null);
    }

    return (
        <div className="container mt-4 nueva-solicitud">

            <h3 className="mb-4">Nueva solicitud</h3>

            {errorServidor && <Alert tipo="danger" mensaje={errorServidor} />}

            {solicitudCreada && (
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <Alert
                            tipo="success"
                            mensaje={`Solicitud #${solicitudCreada.id} creada correctamente.`}
                        />

                        <div className="d-flex gap-2 mt-2">
                            <Link
                                className="btn btn-primary"
                                to={`/solicitud/${solicitudCreada.id}`}
                            >
                                Ver solicitud
                            </Link>

                            <Button
                                texto="Crear otra"
                                tipo="outline-primary"
                                boton="button"
                                onClick={crearOtra}
                            />
                        </div>
                    </div>
                </div>
            )}

            {!solicitudCreada && (
                <form onSubmit={handleSubmit} noValidate>

                    <Input
                        etiqueta="Nombre del cliente"
                        nombre="nombreCliente"
                        valor={solicitud.nombreCliente}
                        onChange={handleChange}
                        requerido
                    />
                    {errores.nombreCliente && (
                        <div className="text-danger small mt-n2 mb-3">{errores.nombreCliente}</div>
                    )}

                    <Input
                        etiqueta="Correo electrónico"
                        nombre="correo"
                        tipo="email"
                        valor={solicitud.correo}
                        onChange={handleChange}
                        requerido
                    />
                    {errores.correo && (
                        <div className="text-danger small mt-n2 mb-3">{errores.correo}</div>
                    )}

                    <Input
                        etiqueta="Asunto"
                        nombre="asunto"
                        valor={solicitud.asunto}
                        onChange={handleChange}
                        requerido
                    />
                    {errores.asunto && (
                        <div className="text-danger small mt-n2 mb-3">{errores.asunto}</div>
                    )}

                    <Textarea
                        etiqueta="Descripción (opcional)"
                        nombre="descripcion"
                        valor={solicitud.descripcion}
                        onChange={handleChange}
                        placeholder="Detalle del problema..."
                    />

                    <Button
                        texto={enviando ? "Enviando..." : "Registrar solicitud"}
                        tipo="primary"
                        boton="submit"
                        deshabilitado={enviando}
                    />
                </form>
            )}

        </div>
    );
}