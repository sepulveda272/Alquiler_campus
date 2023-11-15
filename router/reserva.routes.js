import { Router } from "express"
import  { getReserva, postReserva, deleteReserva } from '../controllers/reserva.controllers.js';

const router = Router();

router.get('/', getReserva);
router.post('/add', postReserva);
router.delete('/:id', deleteReserva);

export default router;