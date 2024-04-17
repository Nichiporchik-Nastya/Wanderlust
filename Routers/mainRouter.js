const Router = require('express');
const router = new Router();
const controller = require('../Controllers/mainController');
const middlewareController = require('../Controllers/middlewareController');
const { body } = require('express-validator');
const UserModel = require("../Models/userModel");
const excursionModel = require('../Models/excursionModel');

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

router.get('/admin/registration', (req, res) => {
  res.render('adminPages/registrationPage');
});

router.post('/api/excursions/create',
  [
    body('name').not().isEmpty().withMessage('Заполните поле'),
    body('description').not().isEmpty().withMessage('Заполните поле'),
    body('description').isLength({ max: 800 }).withMessage('Максимальное количество символов: 800'),
    body('duration').not().isEmpty().withMessage('Заполните поле'),
    body('duration').isLength({ min: 1, max: 12 }).withMessage('Длительность экскурсии должна быть в пределах от 1 до 12'),
    body('adultCost').not().isEmpty().withMessage('Заполните поле'),
    body('formatId').not().isEmpty().withMessage('Заполните поле'),
    body('typeId').not().isEmpty().withMessage('Заполните поле'),
    body('themes').not().isEmpty().withMessage('Выберите одно или несколько значений'),
    body('dayNumber').not().isEmpty().withMessage('Выберите одно или несколько значений'),
    body('startTimes').not().isEmpty().withMessage('Заполните поле'),
    body('startLocation').not().isEmpty().withMessage('Заполните поле'),
    body('endLocation').not().isEmpty().withMessage('Заполните поле'),
  ],
  controller.createExcursion);

router.get('/excursions/create', async (req, res) => {
  let excursionStructure = await excursionModel.getStructure();
  // excursionStructure.push('guideId', req.session.user.id);
  // console.log(excursionStructure);
  // console.log(session);
  res.render('guidePages/createExcursionPage', { data: excursionStructure }); //, guideId: req.session.user.id
});

router.get('/excursions/show/:id', controller.showExcursion);

router.post('/api/excursions/order',
  [
    body('clientName').not().isEmpty().withMessage('Заполните поле'),
    body('clientEmail').not().isEmpty().withMessage('Заполните поле'),
    body('clientPhone').not().isEmpty().withMessage('Заполните поле'),
    body('clientEmail').isEmail().withMessage('Введите корректный адрес электронной почты'),
    body('clientPhone').isMobilePhone().withMessage('Введите корректный номер телефона'),
  ],
  controller.orderExcursion);

router.post('/api/excursions/getExcursionDays', controller.getExcursionDays);

module.exports = router;