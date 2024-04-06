// const { body } = require("express-validator");
const bcrypt = require('bcrypt');

const Excursions = require("../db/models/index").Excursions;
const Formats = require("../db/models/index").Formats;
const Types = require("../db/models/index").Types;
const Themes = require("../db/models/index").Themes;

class ExcursionModel {
  async create(body) {
    return await Excursions.create(body);
  }

  async getStructure() {
    let structure = {
        formats: await Formats.findAll(),
        types: await Types.findAll(),
        themes: await Themes.findAll(),
    }
    return structure;
  };

  

}

module.exports = new ExcursionModel();
