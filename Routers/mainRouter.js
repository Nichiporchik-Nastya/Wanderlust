const Router = require('express');
const router = new Router();
const controller = require('../Controllers/mainController');
const middlewareController = require('../Controllers/middlewareController');

router.get('/dashbord', middlewareController.checkSession, controller.dashbord);
router.get('/', controller.index);


module.exports = router;