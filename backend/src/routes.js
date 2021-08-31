const express = require('express');

const UserController = require('./controllers/UserController');
const PermissionController = require('./controllers/PermissionController');
const RoleController = require('./controllers/RoleController');


const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.post('/authenticate', UserController.authenticate);
routes.post('/permissions', PermissionController.store);
routes.post('/roles', RoleController.store);
routes.post('/users/:user_id/roles', RoleController.occupation);

/**
* Private route
*/
routes.use(authMiddleware);

routes.get('/users', UserController.index);

routes.get('/permissions', PermissionController.index);
  
module.exports = routes;