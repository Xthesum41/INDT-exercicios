import { Request, Response, NextFunction } from "express";
import { CategoriaService } from "../services/CategoriaService";

export class CategoriaController {
  private service = new CategoriaService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoria = await this.service.create(req.body);
      return res.status(201).json(categoria);
    } catch (error) {
      return next(error);
    }
  };

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categorias = await this.service.list();
      return res.json(categorias);
    } catch (error) {
      return next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoria = await this.service.getById(req.params.id);
      return res.json(categoria);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoria = await this.service.update(req.params.id, req.body);
      return res.json(categoria);
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.delete(req.params.id);
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  };
}
