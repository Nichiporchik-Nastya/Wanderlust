'use strict';
/** @type {import('sequelize-cli').Migration} */ // это js doc нотация, нет типизации по умолчанию, так как это обычный js файл и эта директива добавляет типизацию
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Types', [
      { name: 'Индивидуальная экскурсия', description: ' гид проведёт экскурсию только для вас и ваших друзей. 1–4 человек', clientMaxNumber: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Мини-группа', description: ' небольшая группа, есть возможность поддерживать комфортную дистанцию между участниками. 4–12 человек', clientMaxNumber: 12, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Групповая экскурсия', description: ' гид формирует группу. Вместе с вами будут другие туристы. 12–30 человек', clientMaxNumber: 30, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {});
  }
};