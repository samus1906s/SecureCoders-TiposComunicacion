import { Modal as BsModal } from "bootstrap"; //import que trae la clase modal de la libreria de Boostrap
import Button from "./button";

export default function Modal({ id, titulo, mensaje, confirmar }) {

  //función que permite que el boton de cerrar del modal funcione
  function cerrar() {
    const modalElement = document.getElementById(id);
    const modalInstance = BsModal.getInstance(modalElement);
    modalInstance?.hide();
  }

  return (
    <div className="modal fade" id={id} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{titulo}</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">{mensaje}</div>
          <div className="modal-footer">
            <Button
              texto="Cancelar"
              tipo="secondary"
              boton="button"
              onClick={cerrar} //se agrega onclick para que el cancelar funcione
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

