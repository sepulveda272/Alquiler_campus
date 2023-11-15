import { ObjectId } from "mongodb";
import { client, conection } from "../databases/conection.js";

export const getAutomovil = async (req, res) => {
  try {
    const automovilDB = (await conection()).Automovil;
    const result = await automovilDB.find().toArray();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const postAutomovil = async (req, res) => {
  try {
    const { id, marca, modelo, anio, tipo, capacidad, precio_diario } = req.body;
    const db = await conection();
    const nuevo = { id, marca, modelo, anio, tipo, capacidad, precio_diario };
    await db.Automovil.insertOne(nuevo);
    res.json(nuevo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error al agregar el automovil" });
  }
};

export const deleteAutomovil = async (req, res) => {
    try {
      const { id } = req.params;
      const automovilId = new ObjectId(id);
      const automovilDB = (await conection()).Automovil;
      const automovil = await automovilDB.findOneAndDelete({
        _id: automovilId,
      });
      res.json({ message: "Se ha elimenado el automovil", automovil });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Hubo un error al eliminar al automovil de la database" });
    }
  };