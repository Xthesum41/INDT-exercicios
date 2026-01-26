import { Router } from "express";
import { UserController } from "../controller/UserController.js";

const router = Router();

router.post("/users", UserController.create);
router.get("/users", UserController.list);
router.get("/users/:id", UserController.getById);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.softDelete);

export default router;
