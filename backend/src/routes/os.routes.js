import Router from "express";
const router = Router();

import { getOS,createOS, getOSById,updateOS} from "../controllers/osController.js";

router.get("/",getOS);
router.post("/",createOS);
router.get("/:id",getOSById);
router.put("/:id",updateOS);

export default router;
