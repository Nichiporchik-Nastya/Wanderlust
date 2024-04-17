// const { where, Op } = require("sequelize");

const Orders = require("../db/models/index").Orders;
// const Formats = require("../db/models/index").Formats;
// const Types = require("../db/models/index").Types;
// const Themes = require("../db/models/index").Themes;
// const DaysExcursions = require("../db/models/index").DaysExcursions;
// const StartTimes = require("../db/models/index").StartTimes;
// const ThemeExcursions = require("../db/models/index").ThemeExcursions;
// const ImagesExcursions = require("../db/models/index").ImagesExcursions;


class OrderModel {
    async create(body) {
        try {
            await Orders.create(body);            
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = new OrderModel();
