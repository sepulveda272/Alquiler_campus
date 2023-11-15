import { Router } from "express"
import  { deleteAlquiler, getAlquiler, postAlquiler } from '../controllers/alquiler.controllers.js';

const router = Router();

router.get('/', getAlquiler);
router.post('/add', postAlquiler);
router.delete('/:id', deleteAlquiler);

export default router;