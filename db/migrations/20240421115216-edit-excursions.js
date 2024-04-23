// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return Promise.all([
//       queryInterface.changeColumn('Excursions', 'startLocation', {
//         type: Sequelize.STRING,
//         allowNull: true,
//       }),
//       queryInterface.changeColumn('Excursions', 'endLocation', {
//         type: Sequelize.STRING,
//         allowNull: true,
//       }),
//     ]);
//   },

//   down: (queryInterface, Sequelize) => {
//     return Promise.all([
//       queryInterface.changeColumn('Excursions', 'startLocation', {
//         type: Sequelize.STRING,
//         allowNull: false,
//       }),
//       queryInterface.changeColumn('Excursions', 'endLocation', {
//         type: Sequelize.STRING,
//         allowNull: false,
//       }),
//     ]);
//   },
// };