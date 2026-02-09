import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (
  schema: AnyZodObject,
  property: "body" | "params" | "query" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[property]);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: error.issues,
        });
      }
      return next(error);
    }
  };
};
