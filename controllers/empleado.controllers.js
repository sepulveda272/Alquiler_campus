import { ObjectId } from "mongodb";
import { client, conection } from "../databases/conection.js";

export const getEmpleado = async (req, res) => {
  try {
    const empleadoDB = (await conection()).Empleado;
    const result = await empleadoDB.find().toArray();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const postEmpleado = async (req, res) => {
  try {
    const { id, nombre, apellido, numero_de_documento, direccion, telefono, cargo } = req.body;
    const db = await conection();
    const nuevo = { id, nombre, apellido, numero_de_documento, direccion, telefono, cargo };
    await db.Empleado.insertOne(nuevo);
    res.json(nuevo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error al agregar el empleado" });
  }
};

export const deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const empleadoId = new ObjectId(id);
    const empleadoDB = (await conection()).Empleado;
    const empleado = await empleadoDB.findOneAndDelete({
      _id: empleadoId,
    });
    res.json({ message: "Se ha elimenado el empleado", empleado });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Hubo un error al eliminar al empleado de la database" });
  }
};
