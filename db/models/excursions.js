'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Excursions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Excursions.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    formatId: DataTypes.INTEGER,
    adultCost: DataTypes.INTEGER,
    childCost: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    extraInfo: DataTypes.STRING,
    startLocation: DataTypes.STRING,
    endLocation: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Excursions',
  });
  return Excursions;
};