const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//api rutas
router.post('/',usuarioController.crearUsuario);
//router.get('/', usuarioController.obtenerUsuarios);
router.put('/:id', usuarioController.actualizarUsuario);
router.get('/:id', usuarioController.obtenerUsuario);
router.delete('/:id', usuarioController.eliminarUsuarioLog);
router.get('/', usuarioController.obtenerUsuariosOrdenados);


module.exports = router;