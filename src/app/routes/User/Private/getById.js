const router = require('express').Router();


const {UserControllers} = require('../../../controllers');
const {authenticateToken} = require('../../../../../domain/security');

router.get('/getById/:uuid', authenticateToken, UserControllers.getById);


module.exports = router;
