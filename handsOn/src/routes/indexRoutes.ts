import { Router } from "express";
import categoriaRoutes from "./categoriaRoutes";
import produtoRoutes from "./produtoRoutes";

const router = Router();

router.use("/categorias", categoriaRoutes);
router.use("/produtos", produtoRoutes);

export default router;
