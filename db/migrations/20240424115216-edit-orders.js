'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'statusId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'OrderStatuses' },
          key: 'id',
        }
      });
    },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'statusId');
  },
};