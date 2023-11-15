import { Router } from "express"
import  { getEmpleado, postEmpleado, deleteEmpleado } from '../controllers/empleado.controllers.js';

const router = Router();

router.get('/', getEmpleado);
router.post('/add', postEmpleado);
router.delete('/:id', deleteEmpleado);

export default router;