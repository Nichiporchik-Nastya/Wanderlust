'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Formats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Excursions, {
        as: 'excursion',
        foreignKey: 'formatId',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  }
  Formats.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Formats',
  });
  return Formats;
};