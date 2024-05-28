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
      this.belongsTo(models.Formats, {
        as: 'format',
        foreignKey: 'formatId',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
      this.belongsTo(models.Types, {
        as: 'type',
        foreignKey: 'typeId',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
      this.hasMany(models.ImagesExcursions, {
        as: 'images',
        foreignKey: 'excursionId',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
      this.hasMany(models.DaysExcursions, {
        as: 'days',
        foreignKey: 'excursionId',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
      this.hasMany(models.Orders, {
        // as: 'orders',
        foreignKey: 'excursionId',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
      this.belongsTo(models.Users, {
        as: 'guide',
        foreignKey: 'guideId',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  }
  Excursions.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT('medium'),
    guideId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    formatId: DataTypes.INTEGER,
    adultCost: DataTypes.FLOAT,
    childCost: DataTypes.FLOAT,
    duration: DataTypes.FLOAT,
    extraInfo: DataTypes.STRING,
    startLocation: DataTypes.STRING,
    endLocation: DataTypes.STRING,
    points: DataTypes.TEXT('long'),
  }, {
    sequelize,
    modelName: 'Excursions',
  });
  return Excursions;
};