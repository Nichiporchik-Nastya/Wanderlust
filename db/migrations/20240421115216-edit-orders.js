// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return Promise.all([
//       queryInterface.changeColumn('Orders', 'day', {
//         type: Sequelize.DATE,
//         allowNull: true,
//       })
//     ]);
//   },

//   down: (queryInterface, Sequelize) => {
//     return Promise.all([
//       queryInterface.changeColumn('Orders', 'day', {
//         type: Sequelize.INT,
//         allowNull: false,
//       })
//     ]);
//   },
// };