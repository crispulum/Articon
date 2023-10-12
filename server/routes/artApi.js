const express = require('express');
const router = express.Router();
const artController = require('../controllers/artController')
const userController = require('../controllers/userController')


router.get('/fetchArt/:emotion', artController.findArt, (req, res) => res.status(200).json(res.locals.foundArt))

router.patch('/vote', userController.verifyToken, artController.vote, (req, res) => res.status(200).json(res.locals.voted))


router.post('/submitArt', userController.verifyToken,
    artController.queryArt,
    artController.getBigImage,
    artController.saveNewArt,
    (req, res) => res.status(200).json(res.locals.finalArt))

router.post('/validateAndSave', userController.verifyToken,
    artController.validateAndSave,
    (req, res) => res.status(200).json(res.locals.savedArt))


module.exports = router;