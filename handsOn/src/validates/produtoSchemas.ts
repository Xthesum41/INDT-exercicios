import { z } from "zod";

export const produtoCreateSchema = z.object({
  nome: z.string().min(1, "nome é obrigatório"),
  descricao: z.string().optional(),
  preco: z.number().positive("preço deve ser maior que zero"),
  estoque: z.number().int().min(0, "estoque deve ser >= 0"),
  categoriaId: z.string().uuid("categoriaId inválido"),
});

export const produtoUpdateSchema = z.object({
  nome: z.string().min(1).optional(),
  descricao: z.string().optional(),
  preco: z.number().positive().optional(),
  estoque: z.number().int().min(0).optional(),
  categoriaId: z.string().uuid().optional(),
});

export const produtoIdParamSchema = z.object({
  id: z.string().uuid("id inválido"),
});
