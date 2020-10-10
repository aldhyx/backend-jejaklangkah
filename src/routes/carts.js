const CartsRouter = require('express').Router();
const { Authentication, isRoleAdmin } = require('../middleware/auth');
const { validate, Joi } = require('express-validation');

const { AddItem, DeleteItem, GetItems } = require('../controllers/carts');
const validationRules = {
  create: {
    body: Joi.object({
      product_id: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  },
  id: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
};
CartsRouter.post(
  '/',
  Authentication,
  validate(validationRules.create, { keyByField: true }, {}),
  AddItem
);
CartsRouter.get('/', Authentication, GetItems);
CartsRouter.delete(
  '/:id',
  Authentication,
  validate(validationRules.id, { keyByField: true }, {}),
  DeleteItem
);

module.exports = CartsRouter;
