const { Router } = require('express');
const { getEmpleadoVendedor, getEmpleadoCargo } = require('../controllers/empleado.controllers.js');

const router = Router();

router.get('/empleadoV', getEmpleadoVendedor);
router.get('/empleadoC', getEmpleadoCargo);


module.exports = router;