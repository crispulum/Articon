const express = require('express');
const router = express.Router();
const artController = require('../controllers/artController')


router.get('/submitArt', artController.findArt, (req, res) => res.status(200).json(res.locals.foundArt))

router.patch('/', artController.vote, (req, res) => res.status(200).json(res.locals.voted))


router.post('/submitArt',
    artController.queryArt,
    artController.getBigImage,
    artController.saveNewArt,
    (req, res) => res.status(200).json(res.locals.artObj))


module.exports = router;