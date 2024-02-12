const router = require('express').Router();

const Create = require('./Public/create');
const Login = require('./Public/login');
const GetAll = require('./Private/getAll');
const GetById = require('./Private/getById');


router.use('/public', Create);
router.use('/public', Login);
router.use('/private', GetAll);
router.use('/private', GetById);

module.exports = router;
