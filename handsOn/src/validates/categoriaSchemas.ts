import { z } from "zod";

export const categoriaCreateSchema = z.object({
  nome: z.string().min(1, "nome é obrigatório"),
  descricao: z.string().optional(),
});

export const categoriaUpdateSchema = z.object({
  nome: z.string().min(1).optional(),
  descricao: z.string().optional(),
});

export const categoriaIdParamSchema = z.object({
  id: z.string().uuid("id inválido"),
});
