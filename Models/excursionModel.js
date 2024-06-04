// const { where, Op} = require("sequelize");

const { Sequelize, Op } = require('sequelize');
const { extensions } = require('sequelize/lib/utils/validator-extras');
const sequelize = new Sequelize('Wanderlust', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});


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
        await Orders.destroy({ where: { excursionId: id } });
        await ImagesExcursions.destroy({ where: { excursionId: id } });
        await ThemeExcursions.destroy({ where: { excursionId: id } });
        await DaysExcursions.destroy({ where: { excursionId: id } });
        // await StartTimes.destroy({ where: { excursionId: id } });

        //Reviews
        return await Excursions.destroy({ where: { id } });
    }

    async get(id) {
        let excursionData = await Excursions.findOne({
            where: {
                id,
            },
            include: [
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
            }),
            formatData: await Formats.findOne({
                where: {
                    id: excursionData.formatId,
                },
            })
        };
    }

    async getDays(id) {
        try {
            const results = await Orders.findAll({
                attributes: [
                    [Sequelize.literal('DATE(day)'), 'day'],
                    [Sequelize.fn('SUM', Sequelize.literal('COALESCE(numberOfAdults, 0) + COALESCE(numberOfChildren, 0)')), 'count']
                ],
                where: {
                    excursionId: id
                },
                group: ['day']
            });

            const resultArray = results.map(result => ({
                day: result.get('day'),
                count: result.get('count')
            }));

            const excursion = await Excursions.findOne({
                attributes: ['typeId'],
                where: {
                    id: id
                }
            });

            let typeId = excursion.typeId;

            const type = await Types.findOne({
                where: {
                    id: typeId
                }
            });

            const days = await DaysExcursions.findAll({
                where: {
                    excursionId: id,
                },
            });

            return { days: days, daysResult: resultArray, maxCount: type.clientMaxNumber };

        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            throw error;
        }
    }


    async getIds() {
        return await Excursions.findAll();
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
            include: [
                {
                    model: Formats,
                    as: 'format',
                }, {
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

    async getByUserId(id) {
        return await Excursions.findAll({
            where: {
                guideId: id,
            },
            include: [
                {
                    model: Formats,
                    as: 'format',
                }, {
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
                        ['createdAt', 'DESC']
                    ]
                }
            ],
            order: [
                ['adultCost', order]
            ]
        })
    }

    async getAllTypes() {
        return await Types.findAll();
    }

    async getAllFormats() {
        return await Formats.findAll();
    }

    async update(body, files) {
        await ThemeExcursions.destroy({ where: { excursionId: +body.id } });
        await DaysExcursions.destroy({ where: { excursionId: +body.id } });

        if (Array.isArray(body.themes)) {
            await body.themes.forEach(theme => {
                ThemeExcursions.create({ themeId: theme, excursionId: +body.id });
            });
        } else {
            ThemeExcursions.create({ themeId: body.themes, excursionId: +body.id });
        }

        if (Array.isArray(body.dayNumber)) {
            await body.dayNumber.forEach(day => {
                DaysExcursions.create({ dayNumber: day, excursionId: +body.id });
            });
        } else {
            DaysExcursions.create({ dayNumber: body.dayNumber, excursionId: +body.id });
        }

        if (body.deletedStartTime && !Array.isArray(body.deletedStartTime)) {
            body.deletedStartTime = [body.deletedStartTime];
        }
        else if (!body.deletedStartTime) {
            body.deletedStartTime = [];
        }

        // if (body.deletedStartTime.length != 0 && (body?.startTimes?.length ?? 0 - body.deletedStartTime.length ?? 0) >= 0) {
        //     for (const time of body.deletedStartTime) {
        //         await StartTimes.destroy({ where: { id: +time } })
        //     }
        //
        //     if (Array.isArray(body.startTimes)) {
        //         await body.startTimes.forEach(time => {
        //             StartTimes.create({ time: time, excursionId: +body.id });
        //         });
        //     } else if (body.startTimes) {
        //         StartTimes.create({ time: body.startTimes, excursionId: +body.id });
        //     }
        // }
        // else if (body?.startTimes?.length ?? 0 > 0) {
        //     if (Array.isArray(body.startTimes)) {
        //         await body.startTimes.forEach(time => {
        //             StartTimes.create({ time: time, excursionId: +body.id });
        //         });
        //     } else if (body.startTimes) {
        //         StartTimes.create({ time: body.startTimes, excursionId: +body.id });
        //     }
        // }


        if (body.deletedPhotos && !Array.isArray(body.deletedPhotos)) {
            body.deletedPhotos = [body.deletedPhotos];
        }
        else if (!body.deletedPhotos) {
            body.deletedPhotos = [];
        }

        if (body.deletedPhotos.length != 0 && (files?.photos?.length ?? 0 - body.deletedPhotos.length ?? 0) >= 0) {
            for (const photo of body.deletedPhotos) {
                await ImagesExcursions.destroy({ where: { id: +photo } })
            }

            if (Array.isArray(files.photos)) {
                await files.photos.forEach(file => {
                    let rand = (Math.floor(Math.random() * (9999 - 1000 + 1) + 1000));
                    ImagesExcursions.create({ imgSRC: '/public/guideImages/' + rand + file.name, excursionId: body.id });
                    file.mv('public/guideImages/' + rand + file.name);
                });
            }
        }
        else if (((await ImagesExcursions.findAll({ where: { excursionId: +body.id } })).length == 0 || body.deletedPhotos.length != 0) && (files?.photos?.length ?? 0 - body.deletedPhotos.length ?? 0) < 0) {
            return {
                errors: [{ type: 'field', value: '', msg: 'Выберите 4 или более изображений', path: 'photos', location: 'body' }]
            };
        }

        return await Excursions.update(body, {
            where: {
                id: body.id
            }
        })
    }


}

module.exports = new ExcursionModel();
