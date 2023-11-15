import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGO_URI;
const nombreDB = process.env.BDKEY;
const client = new MongoClient(url);
const conection = async () => {
  try {
    await client.connect();
    const db = client.db(nombreDB);
    const colections = {
      Alquiler: db.collection("Alquiler"),
      Automovil: db.collection("Automovil"),
      Cliente: db.collection("Cliente"),
      Empleado: db.collection("Empleado"),
      Registro_devolucion: db.collection("Registro_devolucion"),
      Registro_entrega: db.collection("Registro_entrega"),
      Reserva: db.collection("Reserva"),
      Sucursal: db.collection("Sucursal"),
      Sucursal_automoviles: db.collection("Sucursal_automoviles"),
    };
    console.log("Coneccion Exitosa");
    return colections;
  } catch (error) {
    console.log(error);
    throw new Error("Paila no se pudo conectar a la db");
  }
};
export { conection, client };