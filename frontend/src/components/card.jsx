export default function Card({

    titulo,

    valor,

    icono,

    color = "primary"

}){

    return(

        <div className="card shadow-sm">

            <div className="card-body text-center">

                <i className={`bi ${icono} text-${color} fs-1`}></i>

                <h6 className="mt-3">

                    {titulo}

                </h6>

                <h3>

                    {valor}

                </h3>

            </div>

        </div>

    );

}