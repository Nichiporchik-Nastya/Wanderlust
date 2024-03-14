const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://user:root@localhost:8080/Wanderlust');

const User = sequelize.define('User', {
  // Определение полей модели
  id:{
    type: DataTypes.INT,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastLogged: {
    type: DataTypes.TIME,
    allowNull: false
  },
  imgSRC: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Создание нового пользователя
User.create({ firstName: 'John', lastName: 'Doe' })
  .then(user => {
    console.log(user.toJSON());
  });

// Поиск пользователей
User.findAll({ where: { lastName: 'Doe' } })
  .then(users => {
    console.log(users.map(user => user.toJSON()));
  });

