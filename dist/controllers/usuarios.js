"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLogin = exports.GetLogin = exports.PostRegister = exports.GetRegister = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const node_localstorage_1 = require("node-localstorage");
const localStorage = new node_localstorage_1.LocalStorage('./scratch');
const jwt_1 = require("../helpers/jwt");
const GetRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('REGISTER');
});
exports.GetRegister = GetRegister;
const PostRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lowerName = req.body.nombre;
    const lowerEmail = req.body.email;
    const lowerPassword = req.body.password;
    const nombre = lowerName.toUpperCase();
    const email = lowerEmail.toUpperCase();
    const salt = bcryptjs_1.default.genSaltSync();
    const password = bcryptjs_1.default.hashSync(lowerPassword, salt);
    const usuario = yield usuario_1.default.create({ nombre, email, password });
    return res.json({ usuario });
});
exports.PostRegister = PostRegister;
const GetLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('LOGIN');
});
exports.GetLogin = GetLogin;
const PostLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailLower = req.body.email;
    const email = emailLower.toUpperCase();
    const password = req.body.password;
    const userExist = yield usuario_1.default.findOne({
        where: { email }
    });
    if (!userExist) {
        return res.status(400).json('Usuario o contraseña incorrectos');
    }
    else {
        const passwordExiste = bcryptjs_1.default.compareSync(password, userExist.password);
        if (passwordExiste) {
            try {
                const token = yield (0, jwt_1.generarJWT)(userExist.id);
                localStorage.setItem('token', token);
                return res.json({ userExist, token });
            }
            catch (error) {
                throw new Error(error);
            }
        }
        else {
            return res.status(400).json('Usuario o contraseña incorrectos');
        }
    }
});
exports.PostLogin = PostLogin;
// export const getUsuarios = async(req: Request, res: Response) => {
//     const usuarios = await Usuario.findAll();
//     res.json({ usuarios })
// }
// export const getUsuario = async(req: Request, res: Response) => {
//     const {id} = req.params;
//     const usuario = await Usuario.findByPk( id );
//     if(usuario){
//         res.json({ usuario })
//     }else{
//         res.status(404).json(`No existe el usuario con id ${id}`)
//     }
// }
// export const postUsuario = async(req: Request, res: Response) => {
//     const {body} = req;
//     try{
//         const existeEmail = await Usuario.findOne({
//             where:{
//                 email: body.email
//             }
//         });
//         if(existeEmail){
//             return res.status(400).json({
//                 msg: `El email ${body.email} ya existe`
//             })
//         }else{
//             const usuario = await Usuario.create(body);
//             res.json({usuario})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({
//             msg: 'Hable con el administrador'
//         })
//     }
//     res.json({
//         msg: 'postUsaurios',
//         body
//     })
// }
// export const putUsuario = async(req: Request, res: Response) => {
//     const {id} = req.params
//     const {...data} = req.body;
//     try{
//         const usuario = await Usuario.findByPk(id);
//         if(!usuario){
//             return res.status(400).json({
//                 msg:`No existe un usuario con el id ${id}`
//             });
//         }else{
//             const user  =  await Usuario.update(data, {where: {id: id}});
//             res.status(201).json({
//                 user
//             });
//         }
//     }catch(error)
//     {
//         console.log(error);
//         res.status(500).json({
//             msg:'Hable con el admin'
//         });
//     }
// }
// export const deleteUsuario = async(req: Request, res: Response) => {
//     const {id} = req.params
//     const usuario = await Usuario.findByPk(id);
//     if(!usuario){
//         return res.status(400).json({
//             msg:`No existe un usuario con el id ${id}`
//         });
//     }
//     else{
//         await usuario.update({ estado: false }) 
//     }
// }
//# sourceMappingURL=usuarios.js.map