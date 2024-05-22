// const { body } = require("express-validator");
const bcrypt = require('bcrypt');

const Users = require("../db/models/index").Users;
const ExcursionModel = require('./excursionModel');
const { literal } = require('sequelize');

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

  async getUsersExcursions() {
    let users = await Users.findAll();
    let result = [];

    for (let user of users) {
      let excursions = await ExcursionModel.getByUserId(user.id);
      result.push({ user: user, excursions: excursions });
    }

    return result;
  }

  async getGuides(){
    return await Users.findAll({
      where:{
        role: 2
      },
      attributes:{
          include:[
              [literal('(SELECT COUNT(*) FROM `excursions` WHERE `excursions`.`guideId` = `users`.`id`)'), 'excursionsCount']
          ]
      },
    })
  }
  async getGuide(id) {
    return (await Users.findOne({
      where: {
        id
      },
    }));
  }
  
  async updateGuide(body){
    return await Users.update(body, {
        where: {
            id: body.id
        }
    })
  }
  async deleteGuide(id){
    return await Users.destroy( {
        where: {
            id,
            role: 2
        }
    })
  }
}

module.exports = new UserModel();
