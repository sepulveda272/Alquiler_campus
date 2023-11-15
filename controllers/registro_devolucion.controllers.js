import { ObjectId } from "mongodb";
import { client, conection } from "../databases/conection.js";

export const getRegistroDe = async (req, res) => {
  try {
    const registroDeDB = (await conection()).Registro_devolucion;
    const result = await registroDeDB.find().toArray();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const postRegistroDe = async (req, res) => {
  try {
    const { id, alquiler, empleado, fecha_devolucion, combustible_devuelto, kilometraje_devuelto, monto_adicional } = req.body;
    const db = await conection();
    const nuevo = { id, alquiler, empleado, fecha_devolucion, combustible_devuelto, kilometraje_devuelto, monto_adicional };
    await db.Registro_devolucion.insertOne(nuevo);
    res.json(nuevo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error al agregar el registro de devolucion" });
  }
};

export const deleteRegistroDe = async (req, res) => {
  try {
    const { id } = req.params;
    const registroDeId = new ObjectId(id);
    const registroDeDB = (await conection()).Registro_devolucion;
    const registroDe = await registroDeDB.findOneAndDelete({
      _id: registroDeId,
    });
    res.json({ message: "Se ha elimenado el registro de devolucion", registroDe });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Hubo un error al eliminar al registro de devolucion de la database" });
  }
};
