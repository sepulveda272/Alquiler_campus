import { ObjectId } from "mongodb";
import { client, conection } from "../databases/conection.js";

export const getRegistroEntrega = async (req, res) => {
  try {
    const registroEntregaDB = (await conection()).Registro_entrega;
    const result = await registroEntregaDB.find().toArray();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const postRegistroEntrega = async (req, res) => {
  try {
    const { id, alquiler, empleado, fecha_entrega, combustible_entregado, kilometraje_entregado } = req.body;
    const db = await conection();
    const nuevo = { id, alquiler, empleado, fecha_entrega, combustible_entregado, kilometraje_entregado };
    await db.Registro_entrega.insertOne(nuevo);
    res.json(nuevo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error al agregar el registro de entrega" });
  }
};

export const deleteRegistroEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    const registroEntregaId = new ObjectId(id);
    const registroEntregaDB = (await conection()).Registro_entrega;
    const registroEntrega = await registroEntregaDB.findOneAndDelete({
      _id: registroEntregaId,
    });
    res.json({ message: "Se ha elimenado el registro de entrega", registroEntrega });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Hubo un error al eliminar al registro de entrega de la database" });
  }
};
