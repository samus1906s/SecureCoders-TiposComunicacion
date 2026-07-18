export default function Select({
    etiqueta,
    nombre,
    valor,
    opciones = [],
    onChange
}) {

    return (

        <div className="mb-3">

            <label className="form-label">

                {etiqueta}

            </label>

            <select
                className="form-select"
                name={nombre}
                value={valor}
                onChange={onChange}
            >

                <option value="">
                    Seleccione una opción
                </option>

                {
                    opciones.map((opcion) => (

                        <option
                            key={opcion.value}
                            value={opcion.value}
                        >

                            {opcion.label}

                        </option>

                    ))
                }

            </select>

        </div>

    );

}