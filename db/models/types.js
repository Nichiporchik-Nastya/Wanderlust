'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Excursions, {
        as: 'excursion',
        foreignKey: 'id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  }
  Types.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    clientMaxNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Types',
  });
  return Types;
};