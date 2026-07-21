const API_URL = "http://localhost:3000/solicitudes";

/*
 * Obtiene todas las solicitudes registradas
 * mediante una petición GET al backend.
 */
export async function obtenerSolicitudes() {
  const res = await fetch(API_URL);
  return res.json();
}

/*
 * Actualiza una solicitud existente (nombre, correo,
 * asunto, descripción o estado) mediante una
 * petición PUT, identificada por su id.
 */
export async function actualizarSolicitud(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/*
 * Elimina una solicitud existente mediante
 * una petición DELETE, identificada por su id.
 */
export async function eliminarSolicitud(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}


/*
 * Obtiene una solicitud específica por su id
 * mediante una petición GET al backend.
 * Usada por la pantalla de detalle (polling).
 */
export async function obtenerSolicitudPorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

/*
 * Registra una nueva solicitud de soporte
 * mediante una petición POST al backend.
 * Usada por el formulario NuevaSolicitud.jsx.
 */
export async function agregarSolicitud(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}