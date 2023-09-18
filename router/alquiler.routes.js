const { Router } = require('express');
const { getAlquilerCliente,getAlquilerPorID,getCostoTotal, getFechaInicio2023, getAlquilerTotalRegistrados } = require('../controllers/alquiler.controllers.js');

const router = Router();

router.get('/alquilerCliente', getAlquilerCliente);
router.get("/costo", getCostoTotal);
router.get("/fechaInit2023", getFechaInicio2023)
router.get("/totalRegistro", getAlquilerTotalRegistrados)
router.get("/:id", getAlquilerPorID);

module.exports = router;