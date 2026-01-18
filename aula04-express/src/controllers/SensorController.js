const SensorService = require('../services/SensorService');

class SensorController {
    constructor() {
        this.sensorService = new SensorService();
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req, res) {
        try {
            const sensores = await this.sensorService.getAllSensors();
            res.status(200).json(sensores);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const novoSensor = await this.sensorService.createSensor(req.body);
            res.status(201).json(novoSensor);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const sensorAtualizado = await this.sensorService.updateSensor(id, req.body);
            res.status(200).json(sensorAtualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await this.sensorService.deleteSensor(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = SensorController;
