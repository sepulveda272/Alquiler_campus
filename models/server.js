import dotenv from 'dotenv';
import cors from 'cors';
import express from "express";

import endpoint1Router from "../router/Endpoints.routes.js"
import alquilerRouter from "../router/alquiler.routes.js"
import automovilRouter from "../router/automovil.routes.js"
import clientesRouter from "../router/clientes.routes.js"
import empleadoRouter from "../router/empleado.routes.js"
import devolucionRouter from "../router/registro_devolucion.routes.js"
import entregaRouter from "../router/registro_entrega.routes.js"

dotenv.config();

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use("/get" , endpoint1Router)
        this.app.use("/alquiler" , alquilerRouter)
        this.app.use("/automovil" , automovilRouter)
        this.app.use("/cliente" , clientesRouter)
        this.app.use("/empleado" , empleadoRouter)
        this.app.use("/devolucion" , devolucionRouter)
        this.app.use("/entrega" , entregaRouter)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`se escucha en el puerto: ${this.port}`);
        });
    }
}

export default Server;