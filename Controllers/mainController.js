const path = require('path');
const { validationResult } = require('express-validator');
const UserModel = require("../Models/userModel");
const ExcursionModel = require('../Models/excursionModel');
const OrderModel = require('../Models/orderModel');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const {Orders, ImagesExcursions, ThemeExcursions, DaysExcursions, StartTimes, Excursions} = require("../db/models/index");



class mainController {
    //open pages

    async dashbord(req, res) {
        try {
            const user = req.session.user;
            const guides = await UserModel.getGuides();
            console.log(guides);
            res.render('adminPages/dashbord', { data: user, guides: guides });
        } catch (e) {
            console.log(e);
        }
    }

    async guideDashbord(req, res) {
        try {
            const user = req.session.user;
            let excursions = await ExcursionModel.getByUserId(user.id);
            console.log(excursions);
            res.render('guidePages/dashbord', { user: user, excursions: excursions });
        } catch (e) {
            console.log(e);
        }
    }

    async index(req, res) {
        try {
            let isSession = req.session?.user;
            console.log(isSession);
            res.render('index', { data: isSession });
        } catch (e) {
            console.log(e);
        }
    }

    async allInfo(req, res){
        try {
            let data = await UserModel.getUsersExcursions();
            res.render('allInfo', { data: data });
        } catch (error) {
            console.log(error);
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
                let imgSRC = null;
                if (req?.files?.imgSRC){
                    let rand = (Math.floor(Math.random() * (9999 - 1000 + 1) + 1000));
                    req.files.imgSRC.mv('public/guideImages/' + rand + req.files.imgSRC.name);
                    imgSRC = '/public/guideImages/' + rand + req.files.imgSRC.name;
                }
                let result = await UserModel.create({...req.body, imgSRC});
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
            else if (!req.files?.photos || !Array.isArray(req.files?.photos) || req.body.filesCount < 4) {
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
            console.log(12323456789);
            console.log(await OrderModel.getFreePlaces(id, 'Wed May 22 2024 00:00:00 GMT+0300 (Москва, стандартное время)'));


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
            let code = (Math.floor(Math.random() * (9999 - 1000 + 1) + 1000));
            let result = await OrderModel.create({...req.body, code});
            let excursion = await ExcursionModel.get(result.excursionId);
            const transporter = nodemailer.createTransport({
                service:"gmail",
                port:465,
                secure:true,
                secureConnection:false,
                auth:{
                    user: 'wanderlust.bot@gmail.com',
                    pass: 'culcynsnxlmqywbm'
                },
                tls: {
                    rejectUnAuthorized: true,
                }
            });

            const message = {
                from: `Wanderlust <wanderlust.bot@gmail.com>`,
                to: req.body.clientEmail,
                subject:'Бронирование экскурсии',
                html: await ejs.renderFile('./Views/email.ejs', {
                    domain: 'http://localhost:4002',
                    homeLink: `/excursions/show/${result.excursionId}`,
                    deleteLink: `/delete/order/${result.id}/${code}`,
                    title: excursion.excursionData.name,
                }),
            };

            await transporter.sendMail(message, (err, res)=>{
                if(err){
                    console.log(err.message);
                }
                transporter.close();
            });

            res.status(200).send(result);

        } catch (e) {
            console.log(e);
        }
    }

    async getExcursionDays(req, res) {
        try {
            let id = req.body.excursionId;
            let result = await ExcursionModel.getDays(id);
            console.log(result);
            res.status(200).send(result);

        } catch (e) {
            console.log(e);
        }
    }

    // async getDayOrdersCount(req, res){
    //     try {
    //         let id = req.body.excursionId;

    //         let result = await ExcursionModel.getDaysOrdersCount(id);
    //         res.status(200).send(result);

    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    async search(req, res) {
        try {
            let result = await ExcursionModel.search(req.query?.str);
            console.log(result);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
        }
    }

    async searchFilter(req, res) {
        try {
            let { str, startCost, endCost, formatId, typeId, sort } = req.query;
            if (startCost == "") startCost = 0;
            if (endCost == "") endCost = 1000;
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
            let result = await ExcursionModel.searchForFilter(str, startCost, endCost, formatId, typeId, sort);
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

    async randomExcursion(req, res) {
        try {
            let result = await ExcursionModel.getIds();
            let id = (Math.floor(Math.random() * (result.max - result.min) + result.min));
            res.redirect(`/excursions/show/${id}`);
        } catch (e) {
            console.log(e);
        }
    }

    async getFreePlaces(req, res) {
        try {
            res.json(await OrderModel.getFreePlaces(+req.params.excursionId, req.params.day));

        } catch (e) {
            console.log(e);
        }
    }

    async deleteOrder(req, res){
        try{
            let order = await OrderModel.get(+req?.params?.id);
            if (order?.code == +req.params?.code){
                order.destroy();
                order.save();
            }
            else{
                res.render('deleteOrder', {status:false});
            }
            res.render('deleteOrder', {status:true});
        }
        catch (e) {
            res.render('deleteOrder', {status:false});
        }
    }

    async renderGuide(req, res){
        let guide = await userModel.getGuide(+req.params.id);
        res.render('guidePages/editePage', {guide: guide, user: req.session.user});
    }

    async edite(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            else {
                let imgSRC = undefined;
                if (req?.files?.imgSRC){
                    let rand = (Math.floor(Math.random() * (9999 - 1000 + 1) + 1000));
                    req.files.imgSRC.mv('public/guideImages/' + rand + req.files.imgSRC.name);
                    imgSRC = '/public/guideImages/' + rand + req.files.imgSRC.name;
                }
                let password = undefined;
                let salt = undefined;
                if (req.body?.secondPassword){
                    salt = Math.round(100 - 0.5 + Math.random() * (1000 - 100 + 1));
                    password = await bcrypt.hash(req.body.password + salt, 3);
                }
                let result = await UserModel.updateGuide({...req.body, imgSRC, salt, password});
                if (req.session.user.id == result.id)
                    req.session.user = await UserModel.getGuide(req.body.id);
                res.status(200).send(result);
            }
        } catch (e) {
            console.log(e);
        }
    }
    async deleteUser(req, res) {
        try {
            let excursions = await ExcursionModel.getByUserId(+req.params.id);
            for (const excursion of excursions) {
                let id = excursion.id;
                await Orders.destroy({ where: { excursionId: id } });
                await ImagesExcursions.destroy({ where: { excursionId: id } });
                await ThemeExcursions.destroy({ where: { excursionId: id } });
                await DaysExcursions.destroy({ where: { excursionId: id } });
                await Excursions.destroy({ where: { id } });
            }
            let result = await UserModel.deleteGuide(+req.params.id);
            res.status(200).json(result);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new mainController();