const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();

// get all users

router.get('/', userController.getAllUsers);

// create a new user
router.post('/', userController.createUser);

// get a user
router.get('/:userId', userController.getUser);

// verify a user
router.post('/login', userController.verifyUser);

//verify a user's login token
//NB - this is just a testing route. the middleware is actually used in artApi
router.post('/verifyTokenTest', userController.verifyToken, (req, res) => {
    return res.status(200).json({message: 'token verified!'})
})

// update a user
router.put('/:userId', userController.updateUser);

// delete a user
router.delete('/:userId', userController.deleteUser);

module.exports = router;
