import { useEffect, useRef, useState } from "react";
import { obtenerSocket, enviarMensaje, enviarTyping } from "../services/socket.service";
import Mensaje from "./mensaje";
import Input from "./input";
import Button from "./button";

export default function Chat({ usuario = "Anónimo" }) {
    const [mensajes, setMensajes] = useState([]);
    const [texto, setTexto] = useState("");
    const [escribiendo, setEscribiendo] = useState(null);
    const socket = obtenerSocket();
    const finRef = useRef(null);

    useEffect(() => {

        socket.on("mensaje", (data) => {
            setMensajes((prev) => [...prev, { ...data, sistema: false }]);
        });

        socket.on("typing", (usuarioQueEscribe) => {
            setEscribiendo(usuarioQueEscribe);
            setTimeout(() => setEscribiendo(null), 2000);
        });

        socket.on("notificacion", (data) => {
            const textoSistema = generarTextoNotificacion(data);
            setMensajes((prev) => [...prev, { texto: textoSistema, sistema: true }]);
        });

        return () => {
            socket.off("mensaje");
            socket.off("typing");
            socket.off("notificacion");
        };
    }, [socket]);

    useEffect(() => {
        finRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    function generarTextoNotificacion(data) {
        const { tipo, datos } = data;

        if (tipo === "solicitud:creada") {
            return `Nueva solicitud creada — Cliente: ${datos.nombreCliente}, Asunto: ${datos.asunto}`;
        }
        if (tipo === "solicitud:actualizada") {
            return `Solicitud #${datos.id} — Estado cambiado a: ${datos.estado}`;
        }
        if (tipo === "solicitud:cancelada") {
            return `Solicitud #${datos.id} fue cancelada`;
        }
        return "Actualización de solicitud";
    }

    function handleEnviar(e) {
        e.preventDefault();
        if (texto.trim() === "") return;

        enviarMensaje({ usuario, texto });
        setTexto("");
    }

    function handleCambio(e) {
        setTexto(e.target.value);
        enviarTyping(usuario);
    }

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <div
                    className="mb-3"
                    style={{ height: "350px", overflowY: "auto" }}
                >
                    {mensajes.map((m, i) => (
                        <Mensaje
                            key={i}
                            texto={m.sistema ? m.texto : `${m.usuario}: ${m.texto}`}
                            propio={m.usuario === usuario}
                            sistema={m.sistema}
                        />
                    ))}
                    <div ref={finRef} />
                </div>

                {escribiendo && escribiendo !== usuario && (
                    <p className="text-muted small fst-italic">
                        {escribiendo} está escribiendo...
                    </p>
                )}

                <form onSubmit={handleEnviar} className="d-flex align-items-end gap-2">
                    <div className="flex-grow-1">
                        <Input
                            etiqueta=""
                            nombre="mensaje"
                            placeholder="Escribe un mensaje..."
                            valor={texto}
                            onChange={handleCambio}
                        />
                    </div>
                    <Button texto="Enviar" boton="submit" tipo="primary" />
                </form>
            </div>
        </div>
    );
}