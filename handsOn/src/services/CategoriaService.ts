import { AppDataSource } from "../database";
import { Categoria } from "../entities/Categoria";
import { AppError } from "../errors/AppError";

export class CategoriaService {
  private repo = AppDataSource.getRepository(Categoria);

  async create(data: Pick<Categoria, "nome" | "descricao">) {
    const exists = await this.repo.findOne({ where: { nome: data.nome } });
    if (exists) {
      throw new AppError("Categoria já cadastrada", 409);
    }

    const categoria = this.repo.create(data);
    return this.repo.save(categoria);
  }

  async list() {
    return this.repo.find({ relations: { produtos: true } });
  }

  async getById(id: string) {
    const categoria = await this.repo.findOne({
      where: { id },
      relations: { produtos: true },
    });

    if (!categoria) {
      throw new AppError("Categoria não encontrada", 404);
    }

    return categoria;
  }

  async update(id: string, data: Partial<Pick<Categoria, "nome" | "descricao">>) {
    const categoria = await this.repo.findOne({ where: { id } });
    if (!categoria) {
      throw new AppError("Categoria não encontrada", 404);
    }

    if (data.nome && data.nome !== categoria.nome) {
      const exists = await this.repo.findOne({ where: { nome: data.nome } });
      if (exists) {
        throw new AppError("Categoria já cadastrada", 409);
      }
    }

    this.repo.merge(categoria, data);
    return this.repo.save(categoria);
  }

  async delete(id: string) {
    const categoria = await this.repo.findOne({ where: { id } });
    if (!categoria) {
      throw new AppError("Categoria não encontrada", 404);
    }

    await this.repo.remove(categoria);
    return { message: "Categoria removida" };
  }
}
