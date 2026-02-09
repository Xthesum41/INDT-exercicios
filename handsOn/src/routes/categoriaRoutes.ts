import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";
import { validateRequest } from "../middlewares/validateRequest";
import {
    categoriaCreateSchema,
    categoriaIdParamSchema,
    categoriaUpdateSchema,
} from "../validates/categoriaSchemas";

const router = Router();
const controller = new CategoriaController();

router.post("/", validateRequest(categoriaCreateSchema), controller.create);
router.get("/", controller.list);
router.get(
    "/:id",
    validateRequest(categoriaIdParamSchema, "params"),
    controller.getById
);
router.put(
    "/:id",
    validateRequest(categoriaIdParamSchema, "params"),
    validateRequest(categoriaUpdateSchema),
    controller.update
);
router.delete(
    "/:id",
    validateRequest(categoriaIdParamSchema, "params"),
    controller.delete
);

export default router;
