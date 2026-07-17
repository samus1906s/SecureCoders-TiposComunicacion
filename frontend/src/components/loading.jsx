import "../styles/loading.css";

export default function Loading(){

    return(

        <div className="text-center mt-5">

            <div
                className="spinner-border text-primary"
                role="status"
            >

                <span className="visually-hidden">

                    Cargando...

                </span>

            </div>

            <p className="mt-2">

                Cargando información...

            </p>

        </div>

    );

}