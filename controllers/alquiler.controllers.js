import { ObjectId } from "mongodb";
import { client, conection } from "../databases/conection.js";

export const getAlquiler = async (req, res) => {
  try {
    const alquilerDB = (await conection()).Alquiler;
    const result = await alquilerDB
      .aggregate([
        {
          $lookup: {
            from: "Cliente",
            localField: "id_cliente",
            foreignField: "id_cliente",
            as: "cliente",
          },
        },
        {
          $unwind: "$cliente",
        },
        {
          $lookup: {
            from: "Automovil",
            localField: "id_automovil",
            foreignField: "id_automovil",
            as: "automovil",
          },
        },
        {
          $unwind: "$automovil",
        },
        {
          $project: {
            _id: 1,
            id: 1,
            fecha_inicio: 1,
            fecha_fin: 1,
            costo_total: 1,
            estado: 1,
            cliente: "$cliente",
            automovil: "$automovil",
          },
        },
      ])
      .toArray();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const postAlquiler = async (req, res) => {
  try {
    const { id, cliente, automovil, fecha_Inicio,fecha_Fin,costo_Total,estado } = req.body;
    const db = await conection();
    const nuevo = { id, cliente, automovil, fecha_Inicio,fecha_Fin,costo_Total,estado };
    await db.Alquiler.insertOne(nuevo);
    res.json(nuevo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error al agregar el alquiler" });
  }
};

export const deleteAlquiler = async (req, res) => {
    try {
      const { id } = req.params;
      const alquilerId = new ObjectId(id);
      const alquilerDB = (await conection()).Alquiler;
      const alquiler = await alquilerDB.findOne({
        _id: alquilerId,
      });
      await alquilerDB.updateOne({ _id: alquilerId }, { $set: { estado: "Falta" } });
      res.json({ message: "Se ha elimenado el alquiler", alquiler });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Hubo un error al eliminar al alquiler de la database" });
    }
  };