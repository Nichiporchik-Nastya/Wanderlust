// const { body } = require("express-validator");
const bcrypt = require('bcrypt');

const Users = require("../db/models/index").Users;

class UserModel {
  async create(body) {
    let salt = Math.round(100 - 0.5 + Math.random() * (1000 - 100 + 1));
    return await Users.create({...body, role: 2, salt, password: await bcrypt.hash(body.password + salt, 3)});
  }

  async getByEmail(email){
    return await Users.findOne({
      where: {
        email,
      },
    });
  };

  async checkPasswordCorrect(email, password){
    let user = (await Users.findOne({
      where: {
        email: email
      },
    }));
    return (await bcrypt.compare(password + user?.salt, user?.password));
  }

}

module.exports = new UserModel();
