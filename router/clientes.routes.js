import { Router } from "express"
import  { getCliente, postCliente, deleteCliente } from '../controllers/clientes.controllers.js';

const router = Router();

router.get('/', getCliente);
router.post('/add', postCliente);
router.delete('/:id', deleteCliente);

export default router;