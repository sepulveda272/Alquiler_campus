const { Router } = require('express');
const { getCliente, getClienteDNI, getListarReservasPendientesCliente } = require('../controllers/clientes.controllers.js');

const router = Router();

router.get('/allcliente', getCliente);
router.get('/clienteDNI', getClienteDNI);
router.get('/:id', getListarReservasPendientesCliente);


module.exports = router;