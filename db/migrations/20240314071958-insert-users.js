'use strict';
/** @type {import('sequelize-cli').Migration} */ // это js doc нотация, нет типизации по умолчанию, так как это обычный js файл и эта директива добавляет типизацию
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { name: 'Новый гид', description: null, role: 2, email: 'guide@mail.com', lastLogged: new Date(), imgSRC: null, salt: 459, password: '$2b$04$N.V87IyhIcSaRAewMCIM8eVLY2LC8MQSjg.6S5JvY7VPI3fGC39wC', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Администатор', description: null, role: 1, email: 'admin@mail.com', lastLogged: new Date(), imgSRC: null, salt: 402, password: '$2b$04$sKk8eKIgVqk6YSr1SKcy6O.mMMHD3jLM2SoiH4v4S.c6eHcnlci3i', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};