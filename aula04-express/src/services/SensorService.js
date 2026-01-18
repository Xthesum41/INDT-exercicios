const { readSensorFile, writeSensorFile } = require('../utils/sensorFile');

class SensorService {
    async getAllSensors() {
        return await readSensorFile();
    }

    async createSensor(data) {
        const sensores = await readSensorFile();
        const exists = sensores.some((sensor) => sensor.id === data.id);
        if (exists) {
            throw new Error("Sensor com este id já existe");
        }

        sensores.push(data);
        await writeSensorFile(sensores);
        return data;
    }

    async updateSensor(id, novosDados) {
        const sensores = await readSensorFile();
        const sensorIndex = sensores.findIndex((sensor) => sensor.id === id);

        if (sensorIndex === -1) {
            throw new Error("Sensor não encontrado");
        }

        const sensorAtualizado = {
            ...sensores[sensorIndex],
            ...novosDados,
            id: sensores[sensorIndex].id,
        };

        sensores[sensorIndex] = sensorAtualizado;
        await writeSensorFile(sensores);
        return sensorAtualizado;
    }

    async deleteSensor(id) {
        const sensores = await readSensorFile();
        const sensoresFiltrados = sensores.filter((sensor) => sensor.id !== id);

        if (sensoresFiltrados.length === sensores.length) {
            throw new Error("Sensor não encontrado");
        }

        await writeSensorFile(sensoresFiltrados);
        return { message: "Sensor removido com sucesso" };
    }
}

module.exports = SensorService;
