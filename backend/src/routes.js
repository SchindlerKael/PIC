const express = require('express');

const UserController = require('./controllers/UserController');
const PermissionController = require('./controllers/PermissionController');
const RoleController = require('./controllers/RoleController');
const OptionController = require('./controllers/OptionController');
const ExperimentController = require('./controllers/ExperimentController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.post('/authenticate', UserController.authenticate);

/**
* Private route
*/
routes.use(authMiddleware);

routes.get('/users', UserController.index);

routes.get('/permissions', PermissionController.index);
routes.post('/permissions', PermissionController.store);

routes.post('/roles', RoleController.store);
routes.post('/users/:user_id/roles', RoleController.occupation);

routes.get('/options', OptionController.index);
routes.post('/options', OptionController.store);

routes.get('/experiments', ExperimentController.index);
routes.post('/experiments', ExperimentController.store);
routes.post('/experiments/:experiment_id/answer', ExperimentController.answer);

  
module.exports = routes;