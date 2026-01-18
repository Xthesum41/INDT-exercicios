const { Router } = require('express');
const UserController = require('../controllers/UserController');

const routerUser = Router();
const userController = new UserController();

routerUser.get('/user', userController.getAll);
routerUser.post('/user', userController.create);
routerUser.put('/user/:id', userController.update);
routerUser.delete('/user/:id', userController.delete);

module.exports = routerUser;
