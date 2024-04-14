'use strict';
/** @type {import('sequelize-cli').Migration} */ // это js doc нотация, нет типизации по умолчанию, так как это обычный js файл и эта директива добавляет типизацию
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Formats', [
      { name: 'Пешая', createdAt: new Date(), updatedAt: new Date() },
      { name: 'На транспорте', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Комбинированная', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Formats', null, {});
  }
};