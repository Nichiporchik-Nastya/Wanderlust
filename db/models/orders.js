'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orders.init({
    excursionId: DataTypes.INTEGER,
    clientName: DataTypes.STRING,
    clientPhone: DataTypes.STRING,
    clientEmail: DataTypes.STRING,
    numberOfAdults: DataTypes.INTEGER,
    numberOfChildren: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    startTimeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};


