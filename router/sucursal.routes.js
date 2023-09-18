const { Router } = require('express');
const { getCantidadTotal, getObtenerCantidadAutomovilesPorSucursal } = require('../controllers/sucursal.controllers.js');

const router = Router();

router.get('/sucursalesT', getCantidadTotal);
router.get('/cantiddadTotal', getObtenerCantidadAutomovilesPorSucursal)


module.exports = router;