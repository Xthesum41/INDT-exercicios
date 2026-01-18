const { Router } = require('express');
const SensorController = require('../controllers/SensorController');

const sensorRoutes = Router();
const sensorController = new SensorController();

sensorRoutes.get('/sensor', sensorController.getAll);
sensorRoutes.post('/sensor', sensorController.create);
sensorRoutes.put('/sensor/:id', sensorController.update);
sensorRoutes.delete('/sensor/:id', sensorController.delete);

module.exports = sensorRoutes;
