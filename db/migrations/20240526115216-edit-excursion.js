'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Excursions', 'points', {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      });
    },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Excursions', 'points');
  },
};