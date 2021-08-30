const express = require('express');

const UserController = require('./controllers/UserController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/users', UserController.store);

routes.post('/authenticate', UserController.authenticate);

/**
* Private route
*/
routes.use(authMiddleware);

routes.get('/users', async (req, res) => {
  return res.json([
    {
      id: 1,
      name: 'Mateus Silva',
      website: 'https://devacademy.com.br',
    },
    {
      id: 2,
      name: 'Mark Zuckerberg',
      website: 'https://facebook.com',
    },
    {
      id: 3,
      name: 'Bill Gates',
      website: 'https://www.microsoft.com',
    },
  ]);
});

module.exports = routes;