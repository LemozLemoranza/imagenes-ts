"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validar_campos_1 = require("../helpers/validar-campos");
const custom_validators_1 = require("../helpers/custom-validators");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.get('/register', usuarios_1.GetRegister);
router.post('/register', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre').custom(custom_validators_1.NameExist),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('email').custom(custom_validators_1.EmailExist),
    (0, express_validator_1.check)('password', 'La contraseña debe contener entre 8 y 15 caracteres, sin espacios en blanco y al menos una minúscula, una mayúscula, un número y un caracter especial').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/),
    validar_campos_1.ValidarCampos
], usuarios_1.PostRegister);
router.get('/login', usuarios_1.GetLogin);
router.post('/login', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.ValidarCampos,
], usuarios_1.PostLogin);
router.post('/google', [
    (0, express_validator_1.check)('id_token', 'El tooken de google es obligatorio').not().isEmpty(),
    validar_campos_1.ValidarCampos
], auth_1.GoogleSignIn);
exports.default = router;
//# sourceMappingURL=usuarios.js.map