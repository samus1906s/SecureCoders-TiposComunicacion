export default function Input({
  etiqueta,
  nombre,
  tipo = "text",
  placeholder = "",
  valor,
  onChange,
  requerido = false,
}) {
  return (
    <div className="mb-3">
      <label className="form-label">{etiqueta}</label>

      <input
        className="form-control"
        type={tipo}
        name={nombre}
        placeholder={placeholder}
        value={valor}
        onChange={onChange}
        required={requerido}
      />
    </div>
  );
}
