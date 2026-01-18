const fs = require('node:fs/promises');
const path = require('node:path');

const pathFile = path.join(__dirname, "..", "database", "usuarios.json");

const readUserFile = async () => {
    try {
        const data = await fs.readFile(pathFile, 'utf-8');
        const dataJson = JSON.parse(data);
        return dataJson;
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao ler json de usuarios");
    }
};

const writeUserFile = async (users) => {
    try {
        const data = JSON.stringify(users, null, 2);
        await fs.writeFile(pathFile, data);
    } catch (error) {
        throw new Error("Erro ao escrever no json de usuarios");
    }
};

module.exports = {
    readUserFile,
    writeUserFile,
};
