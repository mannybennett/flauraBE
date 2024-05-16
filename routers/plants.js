const express = require('express');
const plantsController = require('../controllers/plants');
const router = express.Router();

router.get('/', plantsController.fetchPlants);

module.exports = router;