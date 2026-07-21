import { useState } from "react";
import Chat from "../components/chat";

export default function ChatPage() {
    const [rolUsuario, setRolUsuario] = useState("Técnico");

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Chat en tiempo real</h1>
                <div className="d-flex align-items-center gap-2">
                    <label className="fw-bold mb-0">Rol activo:</label>
                    <select
                        className="form-select w-auto"
                        value={rolUsuario}
                        onChange={(e) => setRolUsuario(e.target.value)}
                    >
                        <option value="Técnico">Técnico</option>
                        <option value="Cliente">Cliente</option>
                    </select>
                </div>
            </div>
            <Chat usuario={rolUsuario} />
        </div>
    );
}