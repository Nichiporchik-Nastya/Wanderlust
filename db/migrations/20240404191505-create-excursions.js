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
        type: Sequelize.STRING
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
      themeId: {
        allowNull: false,
        references: {
          model: { tableName: 'Themes' },
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
        type: Sequelize.INTEGER
      },
      extraInfo: {
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