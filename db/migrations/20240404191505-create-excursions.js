'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Excursions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT('medium')
      },
      typeId: {
        allowNull: false,
        references: {
          model: { tableName: 'Types' },
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      formatId: {
        allowNull: false,
        references: {
          model: { tableName: 'Formats' },
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      adultCost: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      childCost: {
        type: Sequelize.INTEGER
      },
      duration: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      extraInfo: {
        type: Sequelize.STRING
      },
      startLocation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      endLocation: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Excursions');
  }
}