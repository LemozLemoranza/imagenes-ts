import express, { Application } from "express";
import cors from "cors";
import userRoutes from "../routes/usuarios";
import authRoutes from "../routes/auth";
import db from "../db/connection";


class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/usuarios',
        auth:'/auth'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        
        this.middlewares();
        this.routes();
        this.dbConnection()
    }

    routes(){
        this.app.use( this.apiPaths.usuarios, userRoutes );
        this.app.use( this.apiPaths.auth, authRoutes );

    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log('DB lista')

        }catch(err:any){
            throw new Error( err )
        }
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))
    }
    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}

export default Server