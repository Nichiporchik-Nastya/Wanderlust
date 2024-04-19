const { where, Op } = require("sequelize");

const Excursions = require("../db/models/index").Excursions;
const Users = require("../db/models/index").Users;
const Formats = require("../db/models/index").Formats;
const Types = require("../db/models/index").Types;
const Themes = require("../db/models/index").Themes;
const DaysExcursions = require("../db/models/index").DaysExcursions;
const StartTimes = require("../db/models/index").StartTimes;
const ThemeExcursions = require("../db/models/index").ThemeExcursions;
const ImagesExcursions = require("../db/models/index").ImagesExcursions;
const Orders = require("../db/models/index").Orders;


class ExcursionModel {
    async create(body, files) {
        try {
            // console.log(body);
            let id = await Excursions.create(body),
            // let id = 1,
            rand = (Math.floor(Math.random() * (9999 - 1000 + 1) + 1000));


            id = id.id;



            if (Array.isArray(files.photos)) {
                await files.photos.forEach(file => {
                    ImagesExcursions.create({ imgSRC: '/public/guideImages/' + rand + file.name, excursionId: id });
                    file.mv('public/guideImages/' + rand + file.name);
                });
            }
            // else {
            //     ImagesExcursions.create({ imgSRC: '/public/guideImages/' + rand + files.photos.name, excursionId: id });
            //     files.photos.mv('public/guideImages/' + rand + files.photos.name);
            // }

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
            console.log(error);
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

    async delete(id) {
        await ImagesExcursions.destroy({ where: { excursionId: id } });
        await ThemeExcursions.destroy({ where: { excursionId: id } });
        await DaysExcursions.destroy({ where: { excursionId: id } });
        await StartTimes.destroy({ where: { excursionId: id } });
        await Orders.destroy({ where: { excursionId: id } });
        //Reviews 
        return await Excursions.destroy({ where: { id } });
    }

    async get(id) {
        let excursionData = await Excursions.findOne({
            where: {
                id,
            },
            include:[
                {
                    model: Users,
                    as: 'guide'
                }
            ]
        });
        return {
            excursionData,
            themesData: await ThemeExcursions.findAll({
                where: {
                    excursionId: id,
                },
            }),
            startTimesData: await StartTimes.findAll({
                where: {
                    excursionId: id,
                },
            }),
            daysExcursionsData: await DaysExcursions.findAll({
                where: {
                    excursionId: id,
                },
            }),
            imagesExcursionsData: await ImagesExcursions.findAll({
                where: {
                    excursionId: id,
                },
            }),
            typeData: await Types.findOne({
                where: {
                    id: excursionData.typeId,
                },
            })
        };
    }

    async getDays(id){
        console.log(id);
        return await DaysExcursions.findAll({
            where: {
                excursionId: id.excursionId,
            },
        });
    }
    async search(str = '') {//имя поля и направление сортировки
        return await Excursions.findAll({
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: `%${str}%`,
                    },
                    description: {
                        [Op.like]: `%${str}%`,
                    }
                },
            },
            include:[
                {
                    model: Formats,
                    as: 'format',
                },{
                    model: Types,
                    as: 'type',
                },
                {
                    model: ImagesExcursions,
                    as: 'images',
                }
            ]
        })
    }

    async searchForFilter(str = "", fromCost, toCost, formats, types, order = 'ASC') {//имя поля и направление сортировки
        return await Excursions.findAll({
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: `%${str}%`,
                    },
                    description: {
                        [Op.like]: `%${str}%`,
                    }
                },
                adultCost: {
                    [Op.between]: [fromCost, toCost]
                },
                formatId: {
                    [Op.in]: formats
                },
                typeId: {
                    [Op.in]: types
                }
            },
            include: [
                {
                    model: DaysExcursions,
                    as: 'days'
                },
                {
                    model: Types,
                    as: 'type'
                },
                {
                    model: Formats,
                    as: 'format'
                },
                {
                    model: ImagesExcursions,
                    as: 'images',
                    order: [
                        ['createdAt', 'ASC']
                    ]
                }
            ],
            order: [
                ['createdAt', order]
            ]
        })
    }

    async getAllTypes (){
        return await Types.findAll();
    }

    async getAllFormats(){
        return await Formats.findAll();
    }


}

module.exports = new ExcursionModel();
