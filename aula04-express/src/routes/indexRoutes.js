const { Router } = require('express');
const sensorRoutes = require('./sensorRoutes');
const userRoutes = require('./userRoutes');

const indexRouter = Router();

indexRouter.use(sensorRoutes);
indexRouter.use(userRoutes);

module.exports = indexRouter;
