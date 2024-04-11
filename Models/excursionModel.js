const Excursions = require("../db/models/index").Excursions;
const Formats = require("../db/models/index").Formats;
const Types = require("../db/models/index").Types;
const Themes = require("../db/models/index").Themes;
const DaysExcursions = require("../db/models/index").DaysExcursions;
const StartTimes = require("../db/models/index").StartTimes;
const ThemeExcursions = require("../db/models/index").ThemeExcursions;
const ImagesExcursions = require("../db/models/index").ImagesExcursions;

class ExcursionModel {
    async create(body, files) {
        try {

            // console.log(files.photos[0]);

            let id = await Excursions.create(body);
            id = id.id;

            if (Array.isArray(files.photos)) {
                await files.photos.forEach(file => {
                    ImagesExcursions.create({ imgSRC: '/public/guideImages/' + Math.random() + file.name, excursionId: id });
                    file.mv('public/guideImages/' + Math.random() + file.name);
                });
            } else {
                ImagesExcursions.create({ imgSRC: '/public/guideImages/' + Math.random() + files.photos.name, excursionId: id });
                files.photos.mv('public/guideImages/' + Math.random() + files.photos.name);
            }

            if (Array.isArray(body.themes)) {
                await body.themes.forEach(theme => {
                    ThemeExcursions.create({ themeId: theme, excursionId: id });
                });
            } else {
                ThemeExcursions.create({ themeId: body.themes, excursionId: id });
            }

            if (Array.isArray(body.dayNumber)) {
                await body.dayNumber.forEach(day => {
                    DaysExcursions.create({ dayNumber: day, excursionId: id });
                });
            } else {
                DaysExcursions.create({ dayNumber: body.dayNumber, excursionId: id });
            }

            if (Array.isArray(body.startTimes)) {
                await body.startTimes.forEach(time => {
                    StartTimes.create({ time: time, excursionId: id });
                });
            } else {
                StartTimes.create({ time: body.startTimes, excursionId: id });
            }



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
