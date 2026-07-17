import "../styles/modal.css";
import Button from "./button";

export default function Modal({

    id,

    titulo,

    mensaje,

    confirmar

}){

    return(

        <div
            className="modal fade"
            id={id}
            tabIndex="-1"
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>

                            {titulo}

                        </h5>

                        <button
                            className="btn-close"
                            data-bs-dismiss="modal"
                        >

                        </button>

                    </div>

                    <div className="modal-body">

                        {mensaje}

                    </div>

                    <div className="modal-footer">

                        <Button
                            texto="Cancelar"
                            tipo="secondary"
                            boton="button"
                        />

                        <Button
                            texto="Aceptar"
                            tipo="success"
                            boton="button"
                            onClick={confirmar}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}