import { Repository } from "typeorm";
import { AppDataSource } from "../datasource/index.js";
import { User } from "../entity/User.js";

export class UserService {
	private repo: Repository<User>;

	constructor() {
		this.repo = AppDataSource.getRepository(User);
	}

	private validatePayload(payload: Partial<User>) {
		if (payload.nome !== undefined) {
			if (!payload.nome || payload.nome.trim().length <= 5) {
				throw new Error("Nome deve ter mais de 5 caracteres.");
			}
		}
		if (payload.password !== undefined) {
			if (!payload.password || payload.password.length <= 6) {
				throw new Error("Password deve ter mais de 6 caracteres.");
			}
		}
		if (payload.genero !== undefined) {
			if (!payload.genero || payload.genero.trim().length === 0) {
				throw new Error("Genero não pode ser vazio.");
			}
		}
	}

	async create(data: Omit<User, "id" | "status">) {
		this.validatePayload(data);

		const exists = await this.repo.findOne({ where: { email: data.email } });
		if (exists) throw new Error("E-mail já cadastrado.");

		const user = this.repo.create({
			...data,
			status: true,
		});
		return this.repo.save(user);
	}

	async list() {
		return this.repo.find();
	}

	async getById(id: number) {
		return this.repo.findOne({ where: { id } });
	}

	async update(id: number, data: Partial<Omit<User, "id" | "status">>) {
		this.validatePayload(data);

		if (data.email) {
			const exists = await this.repo.findOne({ where: { email: data.email } });
			if (exists && exists.id !== id) throw new Error("E-mail já cadastrado.");
		}

		await this.repo.update({ id }, data);
		return this.getById(id);
	}

	async softDelete(id: number) {
		await this.repo.update({ id }, { status: false });
		return this.getById(id);
	}
}
