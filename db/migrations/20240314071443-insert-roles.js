'use strict';
/** @type {import('sequelize-cli').Migration} */ 
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      { roleName: 'ADMIN', createdAt: new Date(), updatedAt: new Date() },
      { roleName: 'GUIDE', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};

