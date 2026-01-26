import type { Request, Response } from "express";
import { UserService } from "../services/UserService.js";

const service = new UserService();

export class UserController {
	static async create(req: Request, res: Response) {
		try {
			const user = await service.create(req.body);
			return res.status(201).json(user);
		} catch (err: any) {
			return res.status(400).json({ error: err.message });
		}
	}

	static async list(_req: Request, res: Response) {
		const users = await service.list();
		return res.json(users);
	}

	static async getById(req: Request, res: Response) {
		const user = await service.getById(Number(req.params.id));
		if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
		return res.json(user);
	}

	static async update(req: Request, res: Response) {
		try {
			const user = await service.update(Number(req.params.id), req.body);
			if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
			return res.json(user);
		} catch (err: any) {
			return res.status(400).json({ error: err.message });
		}
	}

	static async softDelete(req: Request, res: Response) {
		const user = await service.softDelete(Number(req.params.id));
		if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
		return res.json(user);
	}
}
