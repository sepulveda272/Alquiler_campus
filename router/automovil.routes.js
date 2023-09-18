const { Router } = require('express');
const { getAutomovil, getAutomovilMas5, getAutomovilOrdenadoMarcaModelo } = require('../controllers/automovil.controllers.js');

const router = Router();

router.get('/allautomovil', getAutomovil);
router.get('/capacidad5', getAutomovilMas5);
router.get('/ordenarMaMo', getAutomovilOrdenadoMarcaModelo);


module.exports = router;