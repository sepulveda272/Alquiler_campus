import { ObjectId } from "mongodb";
import { client, conection } from "../databases/conection.js";

export const getReserva = async (req, res) => {
  try {
    const reservaDB = (await conection()).Reserva;
    const result = await reservaDB.find().toArray();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const postReserva = async (req, res) => {
  try {
    const { id, cliente, automovil, fecha_reserva, fecha_inicio, fecha_fin, estado } = req.body;
    const db = await conection();
    const nuevo = { id, cliente, automovil, fecha_reserva, fecha_inicio, fecha_fin, estado };
    await db.Reserva.insertOne(nuevo);
    res.json(nuevo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error al agregar la reserva" });
  }
};

export const deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reservaId = new ObjectId(id);
    const reservaDB = (await conection()).Reserva;
    const reserva = await reservaDB.findOneAndDelete({
      _id: reservaId,
    });
    res.json({ message: "Se ha elimenado el reserva", reserva });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Hubo un error al eliminar al reserva de la database" });
  }
};
