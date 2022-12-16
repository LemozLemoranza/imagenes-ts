import { Router } from "express";
import { check, validationResult } from 'express-validator';
import { GetLogin, GetRegister, PostLogin, PostRegister } from '../controllers/usuarios';
import { ValidarCampos } from "../helpers/validar-campos";
import { NameExist, EmailExist } from '../helpers/custom-validators';
import { GoogleSignIn } from '../controllers/auth';

const router = Router();

router.get('/register', GetRegister)
router.post('/register',[

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(NameExist),
    check('email', 'El email es obligatorio').isEmail(),    
    check('email').custom(EmailExist),
    check('password', 'La contraseña debe contener entre 8 y 15 caracteres, sin espacios en blanco y al menos una minúscula, una mayúscula, un número y un caracter especial').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/),
    ValidarCampos

],PostRegister)



router.get('/login', GetLogin)
router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),  
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    ValidarCampos,
], PostLogin)


router.post('/google',[
    check('id_token', 'El tooken de google es obligatorio').not().isEmpty(),
    ValidarCampos
],GoogleSignIn)

export default router;