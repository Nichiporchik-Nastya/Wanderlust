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
      guideId: {
        allowNull: false,
        references: {
          model: { tableName: 'Users' },
          key: 'id'
        },
        type: Sequelize.INTEGER
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
        type: Sequelize.FLOAT
      },
      childCost: {
        type: Sequelize.FLOAT
      },
      duration: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      extraInfo: {
        type: Sequelize.STRING
      },
      startLocation: {
        type: Sequelize.STRING
      },
      endLocation: {
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