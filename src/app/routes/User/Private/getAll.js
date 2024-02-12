const router = require('express').Router();

const {UserControllers} = require('../../../controllers');
const {authenticateToken} = require('../../../../../domain/security');


router.get('/getAll', authenticateToken,  UserControllers.getAll);

module.exports = router;
