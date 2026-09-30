import {listServices,createServices,getServiceById,updateService,deleteService} from '../controllers/serviceController.js';
import Router from 'express';

const router = Router();

router.get('/', listServices);
router.get('/:id', getServiceById);
router.post('/', createServices);
router.put('/:id', updateService);
router.delete('/:id',deleteService)

export default router;