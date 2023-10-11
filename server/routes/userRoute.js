const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();

// get all users

router.get('/', userController.getAllUsers);

// create a new user
router.post('/', userController.createUser);

// get a user
router.get('/:userId', userController.getUser);

// update a user
router.put('/:userId', userController.updateUser);

// delete a user
router.delete('/:userId', userController.deleteUser);

module.exports = router;
