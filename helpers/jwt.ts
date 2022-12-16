import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from "jsonwebtoken";
import Usuario from '../models/usuario';
import {LocalStorage} from 'node-localstorage'
const localStorage = new LocalStorage('./scratch')


export const generarJWT = async(id:string) => {
    try{
        const payload = {id}
        const token = jsonwebtoken.sign(
            payload, 
            process.env.SECRET_KEY as string
        )
        return token;
        
    }catch(error:any){
        throw new Error(error)
    }
}


export const validarJWT = async(req:Request, res: Response, next:NextFunction) => {

    const token = localStorage.getItem('token')
    if(!token){
        return res.status(400).send('Sin token')
    }else{
        try{

            interface JwtPayload {
                id: string
            }
            const {id} = jsonwebtoken.verify(token, process.env.SECRET_KEY as string) as JwtPayload

            const user:any  = await Usuario.findOne({
                where:{ id }
            });
        
            next()

        }catch(error){
            return res.status(400).send('Token invalido')
        }
    }
}