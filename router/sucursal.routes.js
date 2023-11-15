import { Router } from "express"
import  { getSucursal, postSucursal, deleteSucursal } from '../controllers/sucursal.controllers.js';

const router = Router();

router.get('/', getSucursal);
router.post('/add', postSucursal);
router.delete('/:id', deleteSucursal);

export default router;