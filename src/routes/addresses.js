const AddressesRouter = require('express').Router();
const { Authentication } = require('../middleware/auth');
const { validate, Joi } = require('express-validation');

const {
  CreateAddress,
  DeleteAddress,
  UpdateAddress,
  GetAddresses,
  GetAddress,
} = require('../controllers/addresses');

const validationRules = {
  id: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
};

AddressesRouter.post('/', Authentication, CreateAddress);
AddressesRouter.delete(
  '/:id',
  Authentication,
  validate(validationRules.id, { keyByField: true }, {}),
  DeleteAddress
);
AddressesRouter.patch(
  '/:id',
  Authentication,
  validate(validationRules.id, { keyByField: true }, {}),
  UpdateAddress
);
AddressesRouter.get(
  '/:id',
  Authentication,
  validate(validationRules.id, { keyByField: true }, {}),
  GetAddress
);
AddressesRouter.get('/', Authentication, GetAddresses);

module.exports = AddressesRouter;
