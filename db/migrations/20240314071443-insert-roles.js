'use strict';
/** @type {import('sequelize-cli').Migration} */ // это js doc нотация, нет типизации по умолчанию, так как это обычный js файл и эта директива добавляет типизацию
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