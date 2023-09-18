const { MongoClient } = require('mongodb')
const jwt = require ('jsonwebtoken');

const client = new MongoClient(process.env.MONGO_URI);

async function getCollection(collectionName){
    try {
        await client.connect();
        const database = client.db('AlquilerCampus');
        const collection = database.collection(collectionName);
        return collection;
    } catch (error) {
        throw "eso no sirve"
    }
}

const getReserva = async (req,res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collectionReserva = await getCollection('Reserva');
            const collectionClientes = await getCollection('Cliente');
            const collectionAutomovil = await getCollection('Automovil');

            const reservasPendientes = await collectionReserva.find({ estado: 'Pendiente' }).toArray();

            async function obtenerInformacionCliente(clienteId) {
            return await collectionClientes.findOne({ id: clienteId });
            }

            async function obtenerInformacionAutomovil(automovilId) {
            return await collectionAutomovil.findOne({ id: automovilId });
            }

            const resultData = await Promise.all(reservasPendientes.map(async (reserva) => {
            const clienteInfo = await obtenerInformacionCliente(reserva.cliente);
            const automovilInfo = await obtenerInformacionAutomovil(reserva.automovil);

            return {
                reserva: reserva,
                cliente: clienteInfo,
                automovil: automovilInfo
            };
            }));

            res.json(resultData);
        }
    } catch (error) {
        throw "eso no sirve"
    }
}

module.exports = {
    getReserva
}