export default function Mensaje({ texto, propio, sistema }) {
  if (sistema) {
    return (
      <div className="alert alert-warning py-2 px-3 mb-2 small">
        <i className="bi bi-bell-fill me-1"></i>
        <strong>Sistema:</strong> {texto}
      </div>
    );
  }

  return (
    <div className={`d-flex mb-2 ${propio ? "justify-content-end" : "justify-content-start"}`}>
      <div
        className={`px-3 py-2 rounded-3 ${propio ? "bg-primary text-white" : "bg-light border"
          }`}
        style={{ maxWidth: "70%" }}
      >
        {texto}
      </div>
    </div>
  );
}