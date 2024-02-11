const router = require('express').Router();

const Create = require('./Public/create');


router.use('/public', Create);

module.exports = router;
