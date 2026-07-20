export default function Card({

    titulo,
    valor,
    icono,
    color = "primary",
    children

}) {

    return (

        <div className="card shadow-sm">

            <div
                className={
                    children
                        ? "card-body"
                        : "card-body text-center"
                }
            >

                {
                    children ? (

                        children

                    ) : (

                        <>

                            <i
                                className={`bi ${icono} text-${color} fs-1`}
                            ></i>

                            <h6 className="mt-3">

                                {titulo}

                            </h6>

                            <h3>

                                {valor}

                            </h3>

                        </>

                    )
                }

            </div>

        </div>

    );

}