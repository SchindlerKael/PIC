const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const Option = require('../models/Option');
const Experiment = require('../models/Experiment');
const UserAnswers = require('../models/UserAnswers');

const connection = new Sequelize(dbConfig);

User.init(connection);
Role.init(connection);
Permission.init(connection);
Option.init(connection);
Experiment.init(connection);
UserAnswers.init(connection);

User.associate(connection.models);
Role.associate(connection.models);
Permission.associate(connection.models);
Option.associate(connection.models);
Experiment.associate(connection.models);

module.exports = connection;    