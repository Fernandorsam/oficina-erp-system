import Router from 'express';
import {listVehicles,createVehicle,listVehicleById,updateVehicle,deleteVehicle} from '../controllers/vehicleController.js';

const router = Router();

router.get('/', listVehicles);
router.get('/:id', listVehicleById);
router.post('/', createVehicle);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);
export default router;

