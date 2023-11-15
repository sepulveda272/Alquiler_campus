import { ObjectId } from "mongodb";
import { client, conection } from "../databases/conection.js";

export const getCliente = async (req, res) => {
  try {
    const clienteDB = (await conection()).Cliente;
    const result = await clienteDB.find().toArray();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const postCliente = async (req, res) => {
  try {
    const { id, nombre, apellido, direccion, telefono, email, DNI } = req.body;
    const db = await conection();
    const nuevo = { id, nombre, apellido, direccion, telefono, email, DNI };
    await db.Cliente.insertOne(nuevo);
    res.json(nuevo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error al agregar el cliente" });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clieneteId = new ObjectId(id);
    const clienteDB = (await conection()).Cliente;
    const clienete = await clienteDB.findOneAndDelete({
      _id: clieneteId,
    });
    res.json({ message: "Se ha elimenado el clienete", clienete });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Hubo un error al eliminar al clienete de la database" });
  }
};
