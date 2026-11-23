import { Router } from "express";
const router = Router();
import { getParts, addPart, getPartById, updatePart,deletePart } from "../controllers/partController.js";

router.get("/", getParts);
router.post("/", addPart);
router.get("/:id", getPartById);
router.put("/:id", updatePart);
router.delete("/:id", deletePart);

export default router;