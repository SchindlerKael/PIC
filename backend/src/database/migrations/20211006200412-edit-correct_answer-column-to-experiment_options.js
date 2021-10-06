'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'experiment_options',
      'correct_answer',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'experiment_options',
      'correct_answer',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    );
  }
};
