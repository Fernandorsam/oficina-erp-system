import Router from "express"
import { osServServiceCtrl,getOsServiceCtrl,getOsServiceByOsIdCtrl,updateAutorizationCtrl,getOsServiceTotalCtrl } from "../controllers/osServiceController.js";

const router = Router();

router.get('/',getOsServiceCtrl)
router.get('/:id',getOsServiceByOsIdCtrl)
router.put('/:id/authorization',updateAutorizationCtrl)
router.post('/',osServServiceCtrl);
router.get('/:id/totals',getOsServiceTotalCtrl);

export default router;
