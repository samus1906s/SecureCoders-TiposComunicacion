import { useState } from "react";
import { useParams } from "react-router-dom"; 

export default function Evaluacion() {
  const { id } = useParams();
  const [calificacion, setCalificacion] = useState("5");
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "550px" }}>
      <div className="card shadow-sm p-4">
        <h3 className="card-title text-center mb-3">
          Calificar Servicio {id ? `(Solicitud #${id})` : ""}
        </h3>
        
        {enviado ? (
          <div className="alert alert-success text-center m-0">
            ¡Muchas gracias! Tu evaluación ha sido registrada correctamente.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Calificación:</label>
              <select
                className="form-select"
                value={calificacion}
                onChange={(e) => setCalificacion(e.target.value)}
              >
                <option value="5">⭐⭐⭐⭐⭐ (5/5) - Excelente</option>
                <option value="4">⭐⭐⭐⭐ (4/5) - Bueno</option>
                <option value="3">⭐⭐⭐ (3/5) - Regular</option>
                <option value="2">⭐⭐ (2/5) - Malo</option>
                <option value="1">⭐ (1/5) - Pésimo</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Comentario:</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Escribe tus comentarios sobre el servicio recibido..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Enviar Calificación
            </button>
          </form>
        )}
      </div>
    </div>
  );
}