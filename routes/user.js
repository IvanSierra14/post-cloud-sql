const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/',  userController.create);

router.get('/',  userController.fetchAll);

router.get('/:id',  userController.fetchById);

router.patch('/:id',  userController.update);




module.exports = router;
