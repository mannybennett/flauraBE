const express = require('express');
const ordersController = require('../controllers/orders');
const router = express.Router();

router.get('/', ordersController.getAllOrders);

router.get('/:user_id', ordersController.getOrdersByUserID);

router.post('/', ordersController.createOrder);

module.exports = router;