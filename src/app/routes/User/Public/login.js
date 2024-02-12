const router = require('express').Router();
const {UserControllers} = require('../../../controllers');



router.post('/login',
    UserControllers.loginBodyValidation,
    UserControllers.login
);




module.exports = router;
