export default function Button ({
    texto,
    tipo = "primary",
    boton = "button",
    onClick,
    deshabilitado = false,
    anchoCompleto = false
}) {

    return (
        <button
        type={boton}
            className={`btn btn-${tipo} ${anchoCompleto ? "w-100" : ""}`}
            onClick={onClick}
            disabled={deshabilitado}
        >

            {texto}

        </button>
    );
}