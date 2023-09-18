const { MongoClient } = require('mongodb')
const { generateJWT } = require('../helpers/generate.JWT')
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

const getCliente = async (req,res)=>{
    try {
        const collection = await getCollection('Cliente');
        const result = await collection.find().toArray();

        const token = await generateJWT(collection.id)

        res.json({
            token,
            result
        })
    } catch (error) {
        console.log(error);
        throw "eso no sirve"
    }
}

const getClienteDNI = async (req,res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collection = await getCollection('Cliente');
            const result = await collection.find({DNI: '98765432'}).toArray();
            res.json({
                result
            })
        }
       
    } catch (error) {
        throw "eso no sirve"
    }
}

const getListarReservasPendientesCliente = async (req, res) => {
    const clienteId = parseInt(req.params.id);
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collectionClientes = await getCollection('Cliente');
            const collectionReservas = await getCollection('Reserva');
        
            const cliente = await collectionClientes.findOne({ id: clienteId });
            console.log(cliente);
        
            if (!cliente) {
                res.status(404).json({ error: 'Cliente no encontrado' });
                return;
            }
            const reservasPendientes = await collectionReservas.find({
                cliente: clienteId,
                estado: 'Pendiente'
            }).toArray();
        
            res.json({
                cliente,
                reservasPendientes
            });
        }
       
    } catch (error) {
        throw "eso no sirve"
    }
  };

module.exports = {
    getCliente,
    getClienteDNI,
    getListarReservasPendientesCliente
}