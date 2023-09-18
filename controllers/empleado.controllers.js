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

const getEmpleadoVendedor = async (req,res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collection = await getCollection('Empleado');
            const result = await collection.find({cargo: 'Vendedor'}).toArray();
            res.json({
                result
            })
        }
    } catch (error) {
        throw "eso no sirve"
    }
}

const getEmpleadoCargo = async (req,res)=>{
    const validateToken = req.header('token');
    if (!validateToken){
        return res.status(401).json({
            msg: "no tiene token pa"
        })
    }
    try {
        const validado = jwt.verify(validateToken,process.env.SECRET_OR_PRIVATE_KEY)
        if(validado){
            const collection = await getCollection('Empleado');
            const result = await collection.find({$or:[{cargo: 'Gerente'}, {cargo: 'Asistente'}]}).toArray();
            res.json({
                result
            })
        }
    } catch (error) {
        throw "eso no sirve"
    }
}

module.exports = {
    getEmpleadoVendedor,
    getEmpleadoCargo
}