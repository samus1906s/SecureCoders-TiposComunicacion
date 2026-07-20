import pool from "../config/db.js";
import eventBus from "../utils/eventBus.js";

export async function agregarSolicitud(req, res) {
  try {
    const { nombreCliente, correo, asunto, descripcion } = req.body;

    if (!nombreCliente || nombreCliente.trim() === "") {
      return res.status(400).json({ error: "El nombre del cliente es obligatorio." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !emailRegex.test(correo)) {
      return res.status(400).json({ error: "El correo electrónico no tiene un formato válido." });
    }

    if (!asunto || asunto.trim() === "") {
      return res.status(400).json({ error: "El asunto es obligatorio." });
    }

    const [resultado] = await pool.execute(
      "INSERT INTO solicitudes (nombreCliente, correo, asunto, descripcion) VALUES (?, ?, ?, ?)",
      [nombreCliente, correo, asunto, descripcion || null]
    );

    eventBus.emit("solicitud:creada", {
      id: resultado.insertId,
      nombreCliente,
      correo,
      asunto,
      estado: "pendiente"
    });

    res.status(201).json({
      mensaje: "Solicitud creada correctamente.",
      id: resultado.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.sqlMessage || error.message });
  }
}

export async function obtenerSolicitudes(req, res) {
  try {
    const [filas] = await pool.query("SELECT * FROM solicitudes ORDER BY fechaCreacion DESC");
    res.json(filas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.sqlMessage || error.message });
  }
}

export async function obtenerSolicitudPorId(req, res) {
  try {
    const { id } = req.params;
    const [filas] = await pool.execute("SELECT * FROM solicitudes WHERE id = ?", [id]);

    if (filas.length === 0) {
      return res.status(404).json({ error: "Solicitud no encontrada." });
    }

    res.json(filas[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.sqlMessage || error.message });
  }
}

export async function actualizarSolicitud(req, res) {
  try {
    const { id } = req.params;
    const { nombreCliente, correo, asunto, descripcion, estado } = req.body;

    const [existente] = await pool.execute("SELECT * FROM solicitudes WHERE id = ?", [id]);
    if (existente.length === 0) {
      return res.status(404).json({ error: "Solicitud no encontrada para actualizar." });
    }

    // si se manda un correo, debe tener formato válido
    if (correo) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: "El correo electrónico no tiene un formato válido." });
      }
    }
    const nuevoEstado = estado || existente[0].estado;

    await pool.execute(
      `UPDATE solicitudes 
       SET nombreCliente = ?, correo = ?, asunto = ?, descripcion = ?, estado = ? 
       WHERE id = ?`,
      [
        nombreCliente || existente[0].nombreCliente,
        correo || existente[0].correo,
        asunto || existente[0].asunto,
        descripcion || existente[0].descripcion,
        nuevoEstado,
        id
      ]
    );

    eventBus.emit("solicitud:actualizada", {
      id,
      estado: nuevoEstado,
      correo: correo || existente[0].correo
    });

    res.json({ mensaje: "Solicitud actualizada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.sqlMessage || error.message });
  }
}

export async function eliminarSolicitud(req, res) {
  try {
    const { id } = req.params;

    const [existente] = await pool.execute("SELECT * FROM solicitudes WHERE id = ?", [id]);
    if (existente.length === 0) {
      return res.status(404).json({ error: "Solicitud no encontrada." });
    }

    await pool.execute("DELETE FROM solicitudes WHERE id = ?", [id]);

    eventBus.emit("solicitud:cancelada", {
      id,
      correo: existente[0].correo
    });

    res.json({ mensaje: "Solicitud eliminada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.sqlMessage || error.message });
  }
}