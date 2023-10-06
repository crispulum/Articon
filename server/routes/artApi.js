const express = require('express');
const router = express.Router();
const artController = require('../controllers/artController')


router.get('/submitArt', artController.testQuery, (req, res) => res.status(200).json(res.locals.test))


router.post('/submitArt', artController.testQuery, (req, res) => res.status(200).json(res.locals.test))


module.exports = router;