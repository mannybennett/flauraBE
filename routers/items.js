const express = require('express');
const itemsController = require('../controllers/items');
const router = express.Router();

router.get('/:order_id', itemsController.getItemsByOrderID);

router.post('/', itemsController.createItem);

module.exports = router;