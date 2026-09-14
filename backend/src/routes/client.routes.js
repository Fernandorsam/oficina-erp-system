import { Router } from "express";
import { list,create,getById,update,del} from "../controllers/clientController.js";

const router = Router();

router.get('/', list);
router.post('/', create);
router.put('/:id', update);
router.get('/:id', getById);
router.delete('/:id', del);



export default router;