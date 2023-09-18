const { Router } = require('express');
const { getReserva } = require('../controllers/reserva.controllers.js');

const router = Router();

router.get('/reserva', getReserva);


module.exports = router;