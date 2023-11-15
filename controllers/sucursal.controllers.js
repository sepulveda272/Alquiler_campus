import { ObjectId } from "mongodb";
import { client, conection } from "../databases/conection.js";

export const getSucursal = async (req, res) => {
  try {
    const sucursalDB = (await conection()).Sucursal;
    const result = await sucursalDB.find().toArray();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const postSucursal = async (req, res) => {
  try {
    const { id, nombre_sucursal, direccion_sucursal, telefono_sucursal } = req.body;
    const db = await conection();
    const nuevo = { id, nombre_sucursal, direccion_sucursal, telefono_sucursal };
    await db.Sucursal.insertOne(nuevo);
    res.json(nuevo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error al agregar la sucursal" });
  }
};

export const deleteSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const sucursalId = new ObjectId(id);
    const sucursalDB = (await conection()).Sucursal;
    const sucursal = await sucursalDB.findOneAndDelete({
      _id: sucursalId,
    });
    res.json({ message: "Se ha elimenado el sucursal", sucursal });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Hubo un error al eliminar al sucursal de la database" });
  }
};
