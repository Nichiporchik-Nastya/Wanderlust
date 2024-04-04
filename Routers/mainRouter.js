const Router = require('express');
const router = new Router();
const controller = require('../Controllers/mainController');
const middlewareController = require('../Controllers/middlewareController');
const {body} = require('express-validator');
const UserModel = require("../Models/userModel");

router.get('/dashbord', middlewareController.checkSession, middlewareController.checkAdmin, controller.dashbord);
router.get('/', controller.index);

router.get('/guide-dashbord', controller.guideDashbord);


router.post('/api/admin/registration', [
    body('name').isLength({ min: 5 }).withMessage('Имя пользователя должно содержать не менее 5 символов'),
    body('email').isEmail().withMessage('Введите корректный адрес электронной почты'),
    body('email').custom(async (value, { req }) => {
        let emailExist = await UserModel.getByEmail(value);
        if (emailExist) {
          throw new Error('Пользователь с такой почтой уже зарегистрирован');
        }
        return true;
      }),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен содержать не менее 6 символов'),
    body('password').custom((value, { req }) => {
        if (value !== req.body.secondPassword) {
          throw new Error('Пароли должны совпадать');
        }
        return true;
      })
], controller.registration);

router.get('/admin/registration', (req, res)=>{
    res.render('adminPages/registrationPage');
});

router.get('/excursions/create', (req, res)=>{
  res.render('guidePages/createExcursionPage');
});

module.exports = router;