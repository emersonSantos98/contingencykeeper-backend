const router = require('express').Router();


const {UserControllers} = require('../../../controllers');


router.get('/getById/:uuid', UserControllers.getById);


module.exports = router;
