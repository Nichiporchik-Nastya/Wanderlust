'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Excursions, {
        as: 'excursions',
        foreignKey: 'guideId',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    role: DataTypes.INTEGER,
    email: DataTypes.STRING,
    lastLogged: DataTypes.DATE,
    imgSRC: DataTypes.STRING,
    salt: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};