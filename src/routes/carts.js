const CartsRouter = require('express').Router();
const { AddItem, DeleteItem, GetItems } = require('../controllers/carts');

CartsRouter.get('/:id', GetItems);
CartsRouter.post('/:id', AddItem);
CartsRouter.delete('/:id', DeleteItem);

module.exports = CartsRouter;
