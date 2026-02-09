import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";
import { validateRequest } from "../middlewares/validateRequest";
import {
    produtoCreateSchema,
    produtoIdParamSchema,
    produtoUpdateSchema,
} from "../validates/produtoSchemas";

const router = Router();
const controller = new ProdutoController();

router.post("/", validateRequest(produtoCreateSchema), controller.create);
router.get("/", controller.list);
router.get(
    "/:id",
    validateRequest(produtoIdParamSchema, "params"),
    controller.getById
);
router.put(
    "/:id",
    validateRequest(produtoIdParamSchema, "params"),
    validateRequest(produtoUpdateSchema),
    controller.update
);
router.delete(
    "/:id",
    validateRequest(produtoIdParamSchema, "params"),
    controller.delete
);

export default router;
