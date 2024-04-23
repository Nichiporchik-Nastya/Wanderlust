'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderStatuses extends Model {
    static associate(models) {
      this.hasOne(models.Excursions, {
        as: 'excursion',
        foreignKey: 'id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  }
  OrderStatuses.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'OrderStatuses',
  });
  return OrderStatuses;
};