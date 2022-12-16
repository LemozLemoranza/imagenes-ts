import Usuario from '../models/usuario';
import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

export const NameExist = async(lowerName:string) => {
    const nombre = lowerName.toUpperCase();

    const nameExist = await Usuario.findOne({
        where:{ nombre }
    });

    if (nameExist){
        throw new Error(`El nombre ${nombre} ya se encuentra registrado`);        
    }
    else{
        return
    }
}


export const EmailExist = async(lowerEmail:string) => {
    const email = lowerEmail.toUpperCase();

    const emailExist = await Usuario.findOne({
        where:{ email }
    });

    if (emailExist){
        throw new Error(`El correo ${email} ya se encuentra registrado`);        
    }
    else{
        return
    }
}

