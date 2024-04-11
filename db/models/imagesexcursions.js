'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImagesExcursions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ImagesExcursions.init({
    imgSRC: DataTypes.STRING,
    excursionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ImagesExcursions',
  });
  return ImagesExcursions;
};