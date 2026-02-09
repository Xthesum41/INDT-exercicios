import { AppDataSource } from "../database";
import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";
import { AppError } from "../errors/AppError";

export class ProdutoService {
  private repo = AppDataSource.getRepository(Produto);
  private categoriaRepo = AppDataSource.getRepository(Categoria);

  async create(data: {
    nome: string;
    descricao?: string;
    preco: number;
    estoque: number;
    categoriaId: string;
  }) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id: data.categoriaId },
    });

    if (!categoria) {
      throw new AppError("Categoria não encontrada", 404);
    }

    const produto = this.repo.create({
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco,
      estoque: data.estoque,
      categoria,
    });

    return this.repo.save(produto);
  }

  async list() {
    return this.repo.find();
  }

  async getById(id: string) {
    const produto = await this.repo.findOne({ where: { id } });
    if (!produto) {
      throw new AppError("Produto não encontrado", 404);
    }

    return produto;
  }

  async update(
    id: string,
    data: Partial<{
      nome: string;
      descricao?: string;
      preco: number;
      estoque: number;
      categoriaId: string;
    }>
  ) {
    const produto = await this.repo.findOne({ where: { id } });
    if (!produto) {
      throw new AppError("Produto não encontrado", 404);
    }

    if (data.categoriaId) {
      const categoria = await this.categoriaRepo.findOne({
        where: { id: data.categoriaId },
      });
      if (!categoria) {
        throw new AppError("Categoria não encontrada", 404);
      }
      produto.categoria = categoria;
    }

    if (data.nome !== undefined) produto.nome = data.nome;
    if (data.descricao !== undefined) produto.descricao = data.descricao;
    if (data.preco !== undefined) produto.preco = data.preco;
    if (data.estoque !== undefined) produto.estoque = data.estoque;

    return this.repo.save(produto);
  }

  async delete(id: string) {
    const produto = await this.repo.findOne({ where: { id } });
    if (!produto) {
      throw new AppError("Produto não encontrado", 404);
    }

    await this.repo.remove(produto);
    return { message: "Produto removido" };
  }
}
