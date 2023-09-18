const { MongoClient } = require('mongodb');
const express = require('express');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.client = new MongoClient(process.env.MONGO_URI);
        this.path = {
            cliente: '/cliente',
            automovil: '/automovil',
            alquiler: '/alquiler',
            reserva: '/reserva',
            empleado: '/empleado',
            sucursal: '/sucursal',
        };
        this.middleware();
        this.connectDB();
        this.routes();
    }

    async connectDB(){
        try {
            await this.client.connect();
            console.log("se logro conectar la database por fin");
        } catch (error) {
            throw "no se conecta eso"
        }
    }

    middleware(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.path.cliente, require('../router/clientes.routes.js'))
        this.app.use(this.path.automovil, require('../router/automovil.routes.js'))
        this.app.use(this.path.alquiler, require('../router/alquiler.routes.js'))
        this.app.use(this.path.reserva, require('../router/reserva.routes.js'))
        this.app.use(this.path.empleado, require('../router/empleado.routes.js'))
        this.app.use(this.path.sucursal, require('../router/sucursal.routes.js'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`se escucha en el puerto: ${this.port}`);
        });
    }
}

module.exports = Server;