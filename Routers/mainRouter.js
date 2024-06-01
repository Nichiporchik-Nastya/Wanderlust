const Router = require('express');
const router = new Router();
const controller = require('../Controllers/mainController');
const middlewareController = require('../Controllers/middlewareController');
const { body } = require('express-validator');
const UserModel = require("../Models/userModel");
const excursionModel = require('../Models/excursionModel');
const userModel = require("../Models/userModel");

router.get('/dashbord', middlewareController.checkSession, middlewareController.checkAdmin, controller.dashbord);
router.get('/', controller.index);

router.get('/guide-dashbord', middlewareController.checkSession, controller.guideDashbord);


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
  }),
  body('description').not().isEmpty().withMessage('Заполните поле'),
  body('description').isLength({ min: 10 }).withMessage('Описание должно содержать не менее 10 символов'),
  // body('imgSRC').not().isEmpty().withMessage('Выберите изображение'),
], controller.registration);

router.get('/admin/registration', (req, res) => {
  res.render('adminPages/registrationPage');
});

// router.get('/allInfo', (req, res) => {
//   // const data = {};
//   // data.f = 1;
//   // data.fo = 1;
//   // res.render('allInfo', data);
//   res.render('allInfo', {data: result});
// });

router.get('/allInfo', controller.allInfo);

router.post('/api/excursions/create',
  [
    body('name').not().isEmpty().withMessage('Заполните поле'),
    body('description').not().isEmpty().withMessage('Заполните поле'),
    body('description').isLength({ max: 800 }).withMessage('Максимальное количество символов: 800'),
    body('duration').not().isEmpty().withMessage('Заполните поле'),
    // body('duration').isLength({ min: 0.5, max: 12 }).withMessage('Длительность экскурсии должна быть в пределах от 0,5 до 12 часов'),
    body('adultCost').not().isEmpty().withMessage('Заполните поле'),
    body('formatId').not().isEmpty().withMessage('Выберите одно из значений'),
    body('typeId').not().isEmpty().withMessage('Выберите одно из значений'),
    body('themes').not().isEmpty().withMessage('Выберите одно или несколько значений'),
    body('dayNumber').not().isEmpty().withMessage('Выберите одно или несколько значений'),
  ],
  controller.createExcursion);

router.get('/excursions/create', middlewareController.checkSession, middlewareController.checkGuide, async (req, res) => {
  let excursionStructure = await excursionModel.getStructure();
  // excursionStructure.push('guideId', req.session.user.id);
  // console.log(excursionStructure);
  // console.log(session);
    let guides = await userModel.getAllGuide();
  res.render('guidePages/createExcursionPage', { data: excursionStructure, user: req.session.user.id, guides:guides }); //, guideId: req.session.user.id
});

router.get('/excursions/edit/:id', async (req, res) => {
  let excursionStructure = await excursionModel.getStructure();
  let excursion = await excursionModel.get(+req.params?.id);
  let themes = excursion.themesData.map(el => el.themeId);
  const daysWeek = {
    1: "понедельник",
    2: "вторник",
    3: "среда",
    4: "четверг",
    5: "пятница",
    6: "суббота",
    7: "воскресенье",
  }
  let excursionDaysWeek = excursion.daysExcursionsData.map(el => el.dayNumber);
  res.render('guidePages/editExcursionPage', {
    data: excursionStructure, user: 1,
    excursion: excursion, themes: themes,
    daysWeek: daysWeek, excursionDaysWeek: excursionDaysWeek,
  });
});

router.post('/api/excursions/edit',
  [
    body('name').not().isEmpty().withMessage('Заполните поле'),
    body('description').not().isEmpty().withMessage('Заполните поле'),
    body('description').isLength({ max: 800 }).withMessage('Максимальное количество символов: 800'),
    body('duration').not().isEmpty().withMessage('Заполните поле'),
    // body('duration').isLength({ min: 0.5, max: 12 }).withMessage('Длительность экскурсии должна быть в пределах от 0,5 до 12 часов'),
    body('adultCost').not().isEmpty().withMessage('Заполните поле'),
    body('formatId').not().isEmpty().withMessage('Выберите одно из значений'),
    body('typeId').not().isEmpty().withMessage('Выберите одно из значений'),
    body('themes').not().isEmpty().withMessage('Выберите одно или несколько значений'),
    body('dayNumber').not().isEmpty().withMessage('Выберите одно или несколько значений'),
  ], controller.editExcursion);

router.get('/excursions/show/:id', controller.showExcursion);

router.get('/excursions/random', controller.randomExcursion);


router.post('/api/excursions/order',
  [
    body('clientName').not().isEmpty().withMessage('Заполните поле'),
    body('clientEmail').not().isEmpty().withMessage('Заполните поле'),
    body('clientPhone').not().isEmpty().withMessage('Заполните поле'),
    body('numberOfAdults').not().equals("0").withMessage('Введите количество человек'),
    body('clientEmail').isEmail().withMessage('Введите корректный адрес электронной почты'),
    body('clientPhone').isMobilePhone().withMessage('Введите корректный номер телефона'),
    body('day').not().isEmpty().withMessage('Выберите день'),
  ],
  controller.orderExcursion);

router.post('/api/excursions/getExcursionDays', controller.getExcursionDays);
router.get('/api/excursions/places/:excursionId/:day', controller.getFreePlaces);

router.get('/excursions/search', controller.search);
router.get('/excursions/searchfilter', controller.searchFilter);

router.get('/excursions/all', async (req, res) => {
  const data = {};
  let user = req.session?.user;
  // console.log(user);
  data.types = await excursionModel.getAllTypes();
  data.formats = await excursionModel.getAllFormats();
  data.user = user;
  data.guides = await userModel.getAllGuide();
  res.render('allExcursionsPage', data);
});

router.post('/api/excursions/delete', controller.deleteExcursion);
router.get('/delete/order/:id/:code', controller.deleteOrder);

router.get('/guide/edite/:id', middlewareController.checkSession, controller.renderGuide);
router.post('/api/guide/edite/', [
  body('name').isLength({ min: 5 }).withMessage('Имя пользователя должно содержать не менее 5 символов'),
  body('description').not().isEmpty().withMessage('Заполните поле'),
  body('description').isLength({ min: 10 }).withMessage('Описание должно содержать не менее 10 символов'),
  body('email').isEmail().withMessage('Введите корректный адрес электронной почты'),
  body('secondPassword').custom((value, { req }) => {
    if (req.body?.secondPassword){
      if (!req.body?.password || req.body?.password?.length < 6 ) {
        throw new Error('Пароль должен содержать не менее 6 символов');
      }
      if (value !== req.body.password) {
        throw new Error('Пароли должны совпадать');
      }
    }
    return true;
  })
], controller.edite);
router.delete('/api/guide/:id', controller.deleteUser);
module.exports = router;