const router = require('express').Router();

const Create = require('./Public/Create.router');


router.use('/create', Create);

module.exports = router;
