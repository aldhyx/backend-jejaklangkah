const StoresRouter = require('express').Router();
const { Authentication, isRoleAdmin } = require('../middleware/auth');
const { validate, Joi } = require('express-validation');

const {
  CreateStore,
  DeleteStore,
  UpdateStore,
  GetStores,
  GetStore,
} = require('../controllers/stores');

const validationRules = {
  create: {
    body: Joi.object({
      name: Joi.string().trim().required(),
      address: Joi.string().trim().required(),
      city: Joi.string().trim().required(),
      province: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
    }),
  },
  id: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
};

StoresRouter.post(
  '/',
  Authentication,
  validate(validationRules.create, { keyByField: true }, {}),
  CreateStore
);
StoresRouter.delete(
  '/:id',
  Authentication,
  validate(validationRules.id, { keyByField: true }, {}),
  DeleteStore
);
StoresRouter.patch(
  '/:id',
  Authentication,
  validate(validationRules.id, { keyByField: true }, {}),
  UpdateStore
);
StoresRouter.get(
  '/:id',
  Authentication,
  validate(validationRules.id, { keyByField: true }, {}),
  GetStore
);

StoresRouter.get('/', Authentication, isRoleAdmin, GetStores);

module.exports = StoresRouter;
