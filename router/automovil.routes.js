import { Router } from "express"
import  { getAutomovil, postAutomovil, deleteAutomovil } from '../controllers/automovil.controllers.js';

const router = Router();

router.get('/', getAutomovil);
router.post('/add', postAutomovil);
router.delete('/:id', deleteAutomovil);

export default router;