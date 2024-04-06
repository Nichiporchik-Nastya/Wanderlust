// const { body } = require("express-validator");
const bcrypt = require('bcrypt');

const Excursions = require("../db/models/index").Excursions;
const Formats = require("../db/models/index").Formats;
const Types = require("../db/models/index").Types;
const Themes = require("../db/models/index").Themes;
const DaysExcursions = require("../db/models/index").DaysExcursions;
const StartTimes = require("../db/models/index").StartTimes;
const ThemeExcursions = require("../db/models/index").ThemeExcursions;

class ExcursionModel {
    async create(body) {
        try {
            // let id = await Excursions.create(body);
            // id = id.id;

            // if(typeof body.dayNumber == "string"){
            //     body.dayNumber = [body.dayNumber];
            // }

            // if(typeof body.startTimes == "string"){
            //     body.startTimes = [body.startTimes];
            // }

            await body.themes.forEach(theme => {
                 ThemeExcursions.create({ themeId: theme, excursionId: 5 });
            });

            await body.dayNumber.forEach(day => {
                DaysExcursions.create({ dayNumber: day, excursionId: 5 });
            });

            await body.startTimes.forEach(time => {
                StartTimes.create({ time: time, excursionId: 5 });
            });

            return true;

        } catch (error) {
            return false;
        }

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
