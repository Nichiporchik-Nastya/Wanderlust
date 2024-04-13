'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      excursionId: {
        allowNull: false,
        references: {
          model: { tableName: 'Excursions' },
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      clientName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      clientPhone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numberOfAdults: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      numberOfChildren: {
        type: Sequelize.INTEGER
      },
      day: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      startTimeId: {
        allowNull: false,
        references: {
          model: { tableName: 'StartTimes' },
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
}