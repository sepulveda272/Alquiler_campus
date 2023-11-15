import { ObjectId } from "mongodb";
import { client, conection } from "../databases/conection.js";

export const getEndpoint1 = async (req, res) => {
  try {
    const endpointDB = (await conection()).Cliente;
    const result = await endpointDB.find().toArray();

    res.json({
      result,
    });
  } catch (error) {
    console.log(error);
    throw "eso no sirve";
  }
};

export const getEndpoint2 = async (req, res) => {
  try {
    const endpointDB = (await conection()).Automovil;
    const result = await endpointDB.find().toArray();

    res.json({
      result,
    });
  } catch (error) {
    console.log(error);
    throw "eso no sirve";
  }
};

export const getEndpoint3 = async (req, res) => {
  try {
    const endpointDB = (await conection()).Alquiler;
    const result = await endpointDB
      .aggregate([
        {
          $match: {
            estado: "Completado",
          },
        },
        {
          $lookup: {
            from: "Cliente",
            localField: "cliente",
            foreignField: "id",
            as: "clienteInfo",
          },
        },
        {
          $unwind: "$clienteInfo",
        },
      ])
      .toArray();

    res.json({
      result,
    });
  } catch (error) {
    console.log(error);
    throw "eso no sirve";
  }
};

export const getEndpoint4 = async (req, res) => {
  try {
    const collectionReserva = (await conection()).Reserva;
    const collectionClientes = (await conection()).Cliente;
    const collectionAutomovil = (await conection()).Automovil;

    const reservasPendientes = await collectionReserva
      .find({ estado: "Pendiente" })
      .toArray();

    async function obtenerInformacionCliente(clienteId) {
      return await collectionClientes.findOne({ id: clienteId });
    }

    async function obtenerInformacionAutomovil(automovilId) {
      return await collectionAutomovil.findOne({ id: automovilId });
    }

    const resultData = await Promise.all(
      reservasPendientes.map(async (reserva) => {
        const clienteInfo = await obtenerInformacionCliente(reserva.cliente);
        const automovilInfo = await obtenerInformacionAutomovil(
          reserva.automovil
        );

        return {
          reserva: reserva,
          cliente: clienteInfo,
          automovil: automovilInfo,
        };
      })
    );

    res.json(resultData);
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint5 = async (req, res) => {
  try {
    const alquilerId = parseInt(req.params.id);
    const endpointDB = (await conection()).Alquiler;
    const alquiler = await endpointDB.findOne({ id: alquilerId });
    if (alquiler) {
      res.json(alquiler);
    } else {
      res.status(404).json({ error: "Alquiler no encontrado" });
    }
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint6 = async (req, res) => {
  try {
    const endpointDB = (await conection()).Empleado;
    const result = await endpointDB.find({ cargo: "Vendedor" }).toArray();
    res.json({
      result,
    });
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint7 = async (req, res) => {
  try {
    const endpointDB = (await conection()).Sucursal_automoviles;
    const result = await endpointDB
      .aggregate([
        {
          $group: {
            _id: "$sucursal",
            total_disponibles: { $sum: "$cantidad_disponible" },
          },
        },
        {
          $lookup: {
            from: "Sucursal",
            localField: "_id",
            foreignField: "id",
            as: "sucursal",
          },
        },
        {
          $unwind: "$sucursal",
        },
        {
          $sort: { "sucursal.nombre_sucursal": 1 },
        },
      ])
      .toArray();

    res.json({
      result,
    });
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint8 = async (req, res) => {
  try {
    const endpointDB = (await conection()).Alquiler;
    const result = await endpointDB.find({ costo_total: 280 }).toArray();
    res.json({
      result,
    });
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint9 = async (req, res) => {
  try {
    const endpointDB = (await conection()).Cliente;
    const result = await endpointDB.find({ DNI: "98765432" }).toArray();
    res.json({
      result,
    });
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint10 = async (req, res) => {
  try {
    const endpointdb = (await conection()).Automovil;
    const result = await endpointdb.find({ capacidad: { $gte: 5 } }).toArray();
    res.json({
      result,
    });
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint11 = async (req, res) => {
  try {
    const collection = (await conection()).Alquiler;
    const result = await collection
      .find({ fecha_inicio: "2023-07-05" })
      .toArray();
    res.json({
      result,
    });
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint12 = async (req, res) => {
  const clienteId = parseInt(req.params.id);
  try {
    const collectionClientes = (await conection()).Cliente;
    const collectionReservas = (await conection()).Reserva;

    const cliente = await collectionClientes.findOne({ id: clienteId });

    if (!cliente) {
      res.status(404).json({ error: "Cliente no encontrado" });
      return;
    }
    const reservasPendientes = await collectionReservas
      .find({
        cliente: clienteId,
        estado: "Pendiente",
      })
      .toArray();

    if (reservasPendientes.length === 0) {
      res.json({
        cliente,
        mensaje: "No hay reservas pendientes para este cliente",
      });
    } else {
      res.json({
        cliente,
        reservasPendientes,
      });
    }
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint13 = async (req, res) => {
  try {
    const endpointDB = (await conection()).Empleado;
    const result = await endpointDB
      .find({ $or: [{ cargo: "Gerente" }, { cargo: "Asistente" }] })
      .toArray();
    res.json({
      result,
    });
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint14 = async (req, res) => {
  try {
    const endpointDB = (await conection()).Cliente;
    const result = await endpointDB
      .aggregate([
        {
          $lookup: {
            from: "Alquiler",
            localField: "id_cliente",
            foreignField: "id_cliente",
            as: "Alquileres",
          },
        },
        {
          $unwind: "$Alquileres",
        },
        {
          $match: { Alquileres: { $exists: true } },
        },
      ])
      .toArray();
    res.json(result);
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint15 = async (req, res) => {
  try {
    const endpointDB = (await conection()).Automovil;
    const result = await endpointDB
      .find()
      .sort({ marca: 1, modelo: 1 })
      .toArray();
    res.json(result);
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint16 = async (req, res) => {
  try {
    const endpointDB = (await conection()).Sucursal;
    const result = await endpointDB
      .aggregate([
        {
          $lookup: {
            from: "Sucursal_automoviles",
            localField: "id",
            foreignField: "sucursal",
            as: "automoviles",
          },
        },
        {
          $unwind: "$automoviles",
        },
        {
          $group: {
            _id: "$_id",
            direccion: { $first: "$direccion_sucursal" },
            cantidad_Automoviles: { $sum: "$automoviles.cantidad_disponible" },
          },
        },
      ])
      .toArray();
    res.json(result);
  } catch (error) {
    throw "eso no sirve";
  }
};

export const getEndpoint17 = async (req, res) => {
  try {
    const endpointDB = (await conection()).Alquiler;
    const result = await endpointDB.countDocuments();
    res.json({ result });
  } catch (error) {
    throw "eso no sirve";
  }
};
