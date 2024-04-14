'use strict';
/** @type {import('sequelize-cli').Migration} */ // это js doc нотация, нет типизации по умолчанию, так как это обычный js файл и эта директива добавляет типизацию
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Themes', [
      { name: 'Монастыри, церкви, храмы', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Крыши и панорамы', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Гастрономическая', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Старый город', createdAt: new Date(), updatedAt: new Date() },
      { name: 'История и архитектура', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Музеи и искусство', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Переулки и улицы', createdAt: new Date(), updatedAt: new Date() },
      { name: 'По барам', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Themes', null, {});
  }
};