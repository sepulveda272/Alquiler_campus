import { Router } from "express"
import  { getRegistroDe, postRegistroDe, deleteRegistroDe } from '../controllers/registro_devolucion.controllers.js';

const router = Router();

router.get('/', getRegistroDe);
router.post('/add', postRegistroDe);
router.delete('/:id', deleteRegistroDe);

export default router;