const express = require('express');
const router = express.Router();
const artController = require('../controllers/artController')


router.get('/', artController.findArt, (req, res) => res.status(200).json(res.locals.foundArt))

router.patch('/vote', artController.vote, (req, res) => res.status(200).json(res.locals.voted))


router.post('/submitArt',
    artController.queryArt,
    artController.getBigImage,
    artController.saveNewArt,
    (req, res) => res.status(200).json(res.locals.finalArt))


module.exports = router;