import {listServices,createServices,getServiceById,updateService} from '../controllers/serviceController.js';
import Router from 'express';

const router = Router();

router.get('/', listServices);
router.get('/:id', getServiceById);
router.post('/', createServices);
router.put('/:id', updateService);

export default router;