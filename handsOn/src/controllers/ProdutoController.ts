import { Request, Response, NextFunction } from "express";
import { ProdutoService } from "../services/ProdutoService";

export class ProdutoController {
  private service = new ProdutoService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const produto = await this.service.create(req.body);
      return res.status(201).json(produto);
    } catch (error) {
      return next(error);
    }
  };

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const produtos = await this.service.list();
      return res.json(produtos);
    } catch (error) {
      return next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const produto = await this.service.getById(req.params.id);
      return res.json(produto);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const produto = await this.service.update(req.params.id, req.body);
      return res.json(produto);
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
