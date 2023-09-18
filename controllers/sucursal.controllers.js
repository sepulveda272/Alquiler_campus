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

const getCantidadTotal = async (req,res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collectionSucursalAuto = await getCollection('Sucursal_automoviles');
            const lineaS = [
            {
                $group: {
                _id: '$sucursal',
                total_disponibles: { $sum: '$cantidad_disponible' }
                }
            },
            {
                $lookup: {
                from: 'Sucursal',
                localField: '_id',
                foreignField: 'id',
                as: 'sucursal'
                }
            },
            {
                $unwind: '$sucursal'
            },
            {
                $sort: { 'sucursal.nombre_sucursal': 1 }
            }
            ];

            const result = await collectionSucursalAuto.aggregate(lineaS).toArray();

            res.json({
                result
            });
        }
    } catch (error) {
        throw "eso no sirve"
    }
}

const getObtenerCantidadAutomovilesPorSucursal = async (req,res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collectionSucursal = await getCollection('Sucursal');
            const lineaCAPS = [
            {
                $lookup: {
                from: 'Sucursal_automoviles',
                localField: 'id',
                foreignField: 'sucursal',
                as: 'automoviles'
                }
            },
            {
                $unwind: '$automoviles'
            },
            {
                $group: {
                _id: '$_id',
                direccion: { $first: '$direccion_sucursal' },
                cantidad_Automoviles: { $sum: '$automoviles.cantidad_disponible' }
                }
            }
            ];
            const resultadoAgregacion = await collectionSucursal.aggregate(lineaCAPS).toArray();
            res.json(resultadoAgregacion);
        }
    } catch (error) {
        throw "eso no sirve"
    }
} 

module.exports = {
    getCantidadTotal,
    getObtenerCantidadAutomovilesPorSucursal
}