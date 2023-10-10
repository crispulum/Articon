const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// get all users
router.get('/users', userController.getAllUsers);
// create a new user
router.post('/users', userController.createUser);
// get a user
router.get('/users/:userId', userController.getUser);
// update a user
router.put('/users/:userId', userController.updateUser);
// delete a user
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
