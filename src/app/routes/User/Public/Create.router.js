const router = require('express').Router();

const {UserControllers} = require('../../../controllers');



/*
*  @swagger
* /api/user: 'User'
*  post: 'Create a new user'
*  tags: ['User']
* summary: Create a new user
* description: Create a new user
* requestBody:
* required: true
* content:
* application/json:
* schema: 'User'
* type: object
* properties:
* name: 'John Doe'
* email: 'john.doe@gmail.com'
* password: 'password'
* responses: 'User'
* 201:
* description: User created
* content:
* */

router.post('', UserControllers.createBodyValidation,  UserControllers.create );


module.exports = router;
