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

const getAutomovil = async (req,res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collection = await getCollection('Automovil');
            const result = await collection.find().toArray();
            res.json({
                result
            })
        }
    } catch (error) {
        throw "eso no sirve"
    }
}

const getAutomovilMas5 = async (req,res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collection = await getCollection('Automovil');
            const result = await collection.find({capacidad: {$gte: 5}}).toArray();
            res.json({
                result
            })
        }
    } catch (error) {
        throw "eso no sirve"
    }
}

const getAutomovilOrdenadoMarcaModelo = async (req,res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collectionAutomovil = await getCollection('Automovil');
            const automovilesOrdenados = await collectionAutomovil.find().sort({ marca: 1, modelo: 1 }).toArray();
            res.json(automovilesOrdenados);
        }

    } catch (error) {
        throw "eso no sirve"
    }
}

module.exports = {
    getAutomovil,
    getAutomovilMas5,
    getAutomovilOrdenadoMarcaModelo
}