import { useEffect, useState } from "react";
import { Modal as BsModal } from "bootstrap";

import Table from "../components/table";
import Button from "../components/button";
import Modal from "../components/modal";
import Input from "../components/input";
import Select from "../components/select";
import Loading from "../components/loading";
import Alert from "../components/alert";

import {
  obtenerSolicitudes,
  eliminarSolicitud,
  actualizarSolicitud
} from "../services/solicitud.service.js";

const opcionesEstado = [
  { value: "pendiente", label: "Pendiente" },
  { value: "asignada", label: "Asignada" },
  { value: "en proceso", label: "En proceso" },
  { value: "finalizada", label: "Finalizada" },
  { value: "cancelada", label: "Cancelada" },
];

export default function Dashboard() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [solicitudEditando, setSolicitudEditando] = useState(null);
  const [solicitudAEliminar, setSolicitudAEliminar] = useState(null);
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  useEffect(() => {
    if (!alerta) return;
    const timer = setTimeout(() => setAlerta(null), 4000);
    return () => clearTimeout(timer);
  }, [alerta]);

  async function cargarSolicitudes() {
    setCargando(true);
    const datos = await obtenerSolicitudes();
    setSolicitudes(datos);
    setCargando(false);
  }

  const datosParaTabla = solicitudes.map((s) => ({
    id: s.id,
    cliente: s.nombreCliente,
    asunto: s.asunto,
    estado: s.estado,
    fecha: new Date(s.fechaCreacion).toLocaleDateString(),
  }));

  function pedirConfirmacionEliminar(id) {
    setSolicitudAEliminar(id);
    const modalElement = document.getElementById("modalEliminar");
    const modal = new BsModal(modalElement);
    modal.show();
  }

  async function confirmarEliminacion() {
    await eliminarSolicitud(solicitudAEliminar);
    cargarSolicitudes();

    const modalElement = document.getElementById("modalEliminar");
    const modalInstance = BsModal.getInstance(modalElement);
    modalInstance.hide();
  }

  function abrirEdicion(solicitudOriginal) {
    setSolicitudEditando(solicitudOriginal);
    const modalElement = document.getElementById("modalEditar");
    const modal = new BsModal(modalElement);
    modal.show();
  }

  function handleChange(e) {
    setSolicitudEditando({
      ...solicitudEditando,
      [e.target.name]: e.target.value,
    });
  }

  async function guardarEdicion() {
  const respuesta = await actualizarSolicitud(solicitudEditando.id, solicitudEditando);
    if (respuesta.error) {
      setAlerta({ tipo: "danger", mensaje: respuesta.error });
      return;
    }

    cargarSolicitudes();
    setAlerta({ tipo: "success", mensaje: "Solicitud actualizada correctamente." });

    const modalElement = document.getElementById("modalEditar");
    const modalInstance = BsModal.getInstance(modalElement);
    modalInstance.hide();
  }

  if (cargando) return <Loading />;

  return (
    <div className="container mt-4">
      <h3>Solicitudes</h3>

      {alerta && <Alert tipo={alerta.tipo} mensaje={alerta.mensaje} />}

      <Table
        columnas={["ID", "Cliente", "Asunto", "Estado", "Fecha"]}
        datos={datosParaTabla}
        acciones={(fila) => {
          const original = solicitudes.find((s) => s.id === fila.id);
          return (
            <>
              <Button
                texto="Editar"
                tipo="primary"
                boton="button"
                onClick={() => abrirEdicion(original)}
              />
              <span className="mx-1"></span>
              <Button
                texto="Eliminar"
                tipo="danger"
                boton="button"
                onClick={() => pedirConfirmacionEliminar(fila.id)}
              />
            </>
          );
        }}
      />

      <Modal
        id="modalEditar"
        titulo="Editar solicitud"
        confirmar={guardarEdicion}
        mensaje={
          solicitudEditando && (
            <>
              <Input
                etiqueta="Cliente"
                nombre="nombreCliente"
                valor={solicitudEditando.nombreCliente}
                onChange={handleChange}
              />
              <Input
                etiqueta="Correo"
                nombre="correo"
                valor={solicitudEditando.correo}
                onChange={handleChange}
              />
              <Select
                etiqueta="Estado"
                nombre="estado"
                valor={solicitudEditando.estado}
                opciones={opcionesEstado}
                onChange={handleChange}
              />
            </>
          )
        }
      />

      <Modal
        id="modalEliminar"
        titulo="Confirmar eliminación"
        confirmar={confirmarEliminacion}
        mensaje="¿Está seguro que desea eliminar esta solicitud? Esta acción no se puede deshacer."
      />
    </div>
  );
}
