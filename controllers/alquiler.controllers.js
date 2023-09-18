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

const getAlquilerCliente = async (req,res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collectionAlquiler = await getCollection('Alquiler');

            const lineaAlquilerCliente = [
            {
                $match: {
                estado: 'Completado'
                }
            },
            {
                $lookup: {
                from: 'Cliente',
                localField: 'cliente',
                foreignField: 'id',
                as: 'clienteInfo'
                }
            },
            {
                $unwind: '$clienteInfo'
            }
            ];

            const alquileresActivosConClientes = await collectionAlquiler.aggregate(lineaAlquilerCliente).toArray();

            res.json(alquileresActivosConClientes);
        }
    } catch (error) {
        console.log(error);
        throw "eso no sirve"
    }
}

const getAlquilerPorID = async (req,res)=>{
    const alquilerId = parseInt(req.params.id);
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collectionAlquiler  = await getCollection('Alquiler');
            const alquiler = await collectionAlquiler.findOne({ id: alquilerId });

            if (alquiler) {
            res.json(alquiler);
            } else {
            res.status(404).json({ error: 'Alquiler no encontrado' });
            }
        }
    } catch (error) {
        throw "eso no sirve"
    }
}

const getCostoTotal = async (req,res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collection = await getCollection('Alquiler');
            const result = await collection.find({costo_total: 280}).toArray();
            res.json({
                result
            })
        }
    } catch (error) {
        throw "eso no sirve"
    }
}

const getFechaInicio2023 = async (req,res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collection = await getCollection('Alquiler');
            const result = await collection.find({fecha_inicio: '2023-07-05'}).toArray();
            res.json({
                result
            })
        }
    } catch (error) {
        throw "eso no sirve"
    }
}

const getAlquilerTotalRegistrados = async (req, res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collectionAlquiler = await getCollection('Alquiler');
            const cantidadTotalAlquileres = await collectionAlquiler.countDocuments();
            res.json({ cantidadTotalAlquileres });
        }

    } catch (error) {
        throw "eso no sirve"
    }
}

module.exports = {
    getAlquilerCliente,
    getAlquilerPorID,
    getCostoTotal,
    getFechaInicio2023,
    getAlquilerTotalRegistrados
}