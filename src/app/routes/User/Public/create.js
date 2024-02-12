const router = require('express').Router();

const {UserControllers} = require('../../../controllers');



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations about users
 */

/**
 * @swagger
 * /user/public/create:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint will create a new user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *             required:
 *               - name
 *               - age
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 */

router.post('/create',
    UserControllers.userExists,
    UserControllers.createBodyValidation,
    UserControllers.create
);


module.exports = router;



