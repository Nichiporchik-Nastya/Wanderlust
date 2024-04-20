const path = require('path');
const { validationResult } = require('express-validator');
const UserModel = require("../Models/userModel");
const ExcursionModel = require('../Models/excursionModel');
const OrderModel = require('../Models/orderModel');
const {logger} = require("sequelize/lib/utils/logger");



class mainController {
    //open pages

    async dashbord(req, res) {
        try {
            const user = req.session.user;
            res.render('adminPages/dashbord', { data: user });
        } catch (e) {
            console.log(e);
        }
    }

    async guideDashbord(req, res) {
        try {
            const user = req.session.user;
            let excursions = await ExcursionModel.getByUserId(user.id);
            console.log(excursions);
            res.render('guidePages/dashbord', { user:user, excursions:excursions });
        } catch (e) {
            console.log(e);
        }
    }

    async index(req, res) {
        try {
            let isSession = req.session?.user ? true : false;
            console.log(isSession);
            res.render('index', { data: isSession});
        } catch (e) {
            console.log(e);
        }
    }

    //users

    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            else {
                let result = await UserModel.create(req.body);
                res.status(200).send(result);
            }
        } catch (e) {
            console.log(e);
        }
    }

    //excursions

    async createExcursion(req, res) {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            else if (!req.files?.photos || !Array.isArray(req.files?.photos) || req.files?.photos.lenght < 4) {
                errors = [{ type: 'field', value: '', msg: 'Выберите 4 или более изображений', path: 'photos', location: 'body' }];
                return res.status(400).json({ errors: errors });
            }
            else if (Array.isArray(req.files?.photos)) {
                req.files?.photos.forEach(element => {
                    if (!element.mimetype.includes("image")) {
                        errors = [{ type: 'field', value: '', msg: 'Один или несколько файлов не являются изображениями', path: 'photos', location: 'body' }];
                        return res.status(400).json({ errors: errors });
                    }
                });
            }
            else if (!req.files?.photos.mimetype.includes("image")) {
                errors = [{ type: 'field', value: '', msg: 'Файл не является изображением', path: 'photos', location: 'body' }];
                return res.status(400).json({ errors: errors });
            }
            let result = await ExcursionModel.create(req.body, req.files);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
        }
    }

    async deleteExcursion(req, res) {
        try {
            // const errors = validationResult(req);

            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }
            // else {

                let result = await ExcursionModel.delete(req.body.id);

                res.status(200).json(result);
            // }

        } catch (e) {
            console.log(e);
        }
    }

    async showExcursion(req, res) {
        try {
            const id = +req?.params?.id;
            let result = await ExcursionModel.get(id);

            let isSession = req.session?.user ? true : false;
            console.log(result);


            res.render('excursionPage', { data: result, user: isSession });
        } catch (e) {
            console.log(e);
        }
    }

    async orderExcursion(req, res) {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let result = await OrderModel.create(req.body);
            res.status(200).send(result);

        } catch (e) {
            console.log(e);
        }
    }

    async getExcursionDays(req, res){
        try {

            let result = await ExcursionModel.getDays(req.body);
            console.log(result);
            res.status(200).send(result);

        } catch (e) {
            console.log(e);
        }
    }

    async search(req, res){
        try {
            let result = await ExcursionModel.search(req.query?.str);
            console.log(result);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
        }
    }

    async searchFilter(req, res){
        try {
            let {str, startCost, endCost, formatId, typeId, sort} = req.query;
            if (!formatId) {
                formatId = (await ExcursionModel.getAllFormats()).map(el => el.dataValues.id);
            }
            if (!typeId) {
                typeId = (await ExcursionModel.getAllTypes()).map(el => el.dataValues.id);
            }
            formatId = typeof formatId === 'string' ? [formatId] : formatId;
            typeId = typeof typeId === 'string' ? [typeId] : typeId;
            formatId = formatId.map(el => +el);
            typeId = typeId.map(el => +el);
            let result = await ExcursionModel.searchForFilter(str, startCost, endCost, formatId, typeId, sort );
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
        }
    }

    async editExcursion(req, res) {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            else if ((!req.files?.photos || !Array.isArray(req.files?.photos) || req.files?.photos.lenght < 4) && req.body?.deletedPhotos?.length == 0) {
                errors = [{ type: 'field', value: '', msg: 'Выберите 4 или более изображений', path: 'photos', location: 'body' }];
                return res.status(400).json({ errors: errors });
            }
            let result = await ExcursionModel.update(req.body, req.files);
            res.status(200).json(result);
        } catch (e) {
            console.log(e);
        }
    }


}

module.exports = new mainController();