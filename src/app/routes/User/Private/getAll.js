const router = require('express').Router();

const {UserControllers} = require('../../../controllers');



router.get('/getAll', UserControllers.getAll);

module.exports = router;
