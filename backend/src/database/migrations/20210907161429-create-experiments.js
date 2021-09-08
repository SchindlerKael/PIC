'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('experiments', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
      }, 
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      suport_text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      expected_rate: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      event_rate: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      initial_value: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
     
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('experiments');
     
  }
};