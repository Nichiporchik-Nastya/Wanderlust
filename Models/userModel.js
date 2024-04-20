// const { body } = require("express-validator");
const bcrypt = require('bcrypt');

const Users = require("../db/models/index").Users;

class UserModel {
  async create(body, files) {
    try {
      let salt = Math.round(100 - 0.5 + Math.random() * (1000 - 100 + 1));
      await Users.create({ ...body, role: 2, salt, password: await bcrypt.hash(body.password + salt, 3) });
      // console.log(files);
      // files.photos.mv(files.photos.name);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getByEmail(email) {
    return await Users.findOne({
      where: {
        email,
      },
    });
  };

  async checkPasswordCorrect(email, password) {
    let user = (await Users.findOne({
      where: {
        email: email
      },
    }));
    return (await bcrypt.compare(password + user?.salt, user?.password));
  }

  async getRole(email) {
    let user = await Users.findOne({
      where: {
        email
      },
    });
    return await user?.role;
  }

}

module.exports = new UserModel();
