const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const userValidator = require('../validators/user');


/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - users
 *     summary: Create an user
 *     description: Create A user providing name,surname,type,email,username and company
 *     requestBody:
 *       description: A JSON object containing all the fields in the description
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateRequest'
 *     responses:
 *       200:
 *         description: Returns the created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfoResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError' 
 *              
 */
router.post('/', userValidator.create(), userController.create);
/**
 * @swagger
 * /users/{uuid}:
 *   get:
 *     tags:
 *       - users
 *     summary: Get user information
 *     description: Get user's info providing its UUID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: Identifier number of a user
 *     responses:
 *       200:
 *         description: Returns the users info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfoResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *       
 */
router.get('/:uuid',userValidator.getByUuid(),userController.getByUuid);

/**
 * @swagger
 * /users/{uuid}:
 *   patch:
 *     tags:
 *       - users
 *     summary: Change user information
 *     description: Change user's info providing its UUID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: Identifier number of a user
 *     requestBody:
 *       description: A JSON object containing all the fields in the description
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInfoRequest'
 *     responses:
 *       200:
 *         description: Returns the created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfoResponse
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *       
 */
router.patch('/:uuid',userValidator.update(),userController.update);

/**
 * @swagger
 * /users/{uuid}/resend-mail:
 *   post:
 *     tags:
 *       - users
 *     summary: Resend user mail
 *     description: Service to resend mail with the invitation link
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: Identifier number of a user 
 *     responses:
 *       200:
 *         description: Returns the created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserMessage'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError' 
 *              
 */
router.post('/:uuid/resend-mail', userValidator.resendMail(), userController.resendMail);

/**
 * @swagger
 * /users/{uuid}:
 *   delete:
 *     tags:
 *       - users
 *     summary: Delete user 
 *     description: Delete user providing its UUID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: Identifier number of a user
 *     responses:
 *       200:
 *         description: Returns the user id deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *       
 */
router.delete('/:uuid',userValidator.remove(),userController.remove);

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - users
 *     summary: List of users 
 *     description: Obtain list of users
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of elements per page
 *         example: 3
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number
 *         example: 1
 *     responses:
 *       200:
 *         description: Returns a list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserList'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *       
 */
router.get('/', userValidator.fetchAll(), userController.fetchAll);

/**
 * @swagger
 * /users/{email}/reactivate:
 *   post:
 *     tags:
 *       - users
 *     summary: Reactive user account
 *     description: Service to reactive account providing it's email
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user account to be reactivated
 *     responses:
 *       200:
 *         description: Returns the user id reactivated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError' 
 *              
 */
router.post('/:email/reactivate', userValidator.reactivate(), userController.reactivate);

module.exports = router;
