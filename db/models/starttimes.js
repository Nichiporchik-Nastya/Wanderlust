'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StartTimes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StartTimes.init({
    time: DataTypes.TIME,
    excursionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'StartTimes',
  });
  return StartTimes;
};