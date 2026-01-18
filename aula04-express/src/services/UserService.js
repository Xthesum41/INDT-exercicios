const { randomUUID } = require('node:crypto');
const { readUserFile, writeUserFile } = require('../utils/userFile');

class UserService {
    async getAllUsers() {
        return await readUserFile();
    }

    async createUser(data) {
        const users = await readUserFile();

        if (!data.email) {
            throw new Error("Email é obrigatório");
        }

        const emailExists = users.some((user) => user.email === data.email);
        if (emailExists) {
            throw new Error("E-mail já cadastrado");
        }

        const senha = data.senha ?? data.password;
        if (!senha || senha.length < 6) {
            throw new Error("Senha deve ter pelo menos 6 dígitos");
        }

        const newUser = {
            id: data.id ?? randomUUID(),
            ...data,
        };

        users.push(newUser);
        await writeUserFile(users);
        return newUser;
    }

    async updateUser(id, novosDados) {
        const users = await readUserFile();
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            throw new Error("Usuário não encontrado");
        }

        const senha = novosDados.senha ?? novosDados.password;
        if (senha && senha.length < 6) {
            throw new Error("Senha deve ter pelo menos 6 dígitos");
        }

        const userAtualizado = {
            ...users[userIndex],
            ...novosDados,
            id: users[userIndex].id,
        };

        users[userIndex] = userAtualizado;
        await writeUserFile(users);
        return userAtualizado;
    }

    async deleteUser(id) {
        const users = await readUserFile();
        const usersFiltrados = users.filter((user) => user.id !== id);

        if (usersFiltrados.length === users.length) {
            throw new Error("Usuário não encontrado");
        }

        await writeUserFile(usersFiltrados);
        return { message: "Usuário removido com sucesso" };
    }
}

module.exports = UserService;
