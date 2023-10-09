const express = require('express');
const router = express.Router();
const artController = require('../controllers/artController')


router.get('/submitArt', artController.testMW, (req, res) => res.status(200).json('wah!'))


router.post('/submitArt',
    artController.trueQueryArt,
    artController.getBigImage,
    artController.saveNewArt,
    (req, res) => res.status(200).json(res.locals.artObj))


module.exports = router;