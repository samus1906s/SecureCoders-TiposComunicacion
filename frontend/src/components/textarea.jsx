export default function Textarea({
    etiqueta,
    nombre,
    valor,
    onChange,
    placeholder = "",
    filas = 4
}) {

    return (

        <div className="mb-3">

            <label className="form-label">

                {etiqueta}

            </label>

            <textarea
                className="form-control"
                name={nombre}
                rows={filas}
                value={valor}
                placeholder={placeholder}
                onChange={onChange}
            />

        </div>

    );

}