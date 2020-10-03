const AddressesRouter = require('express').Router();
const {
  CreateAddress,
  DeleteAddress,
  UpdateAddress,
  GetAddresses,
  GetAddress,
} = require('../controllers/addresses');

AddressesRouter.post('/', CreateAddress);
AddressesRouter.delete('/:id', DeleteAddress);
AddressesRouter.patch('/:id', UpdateAddress);
AddressesRouter.get('/', GetAddresses);
AddressesRouter.get('/:id', GetAddress);

module.exports = AddressesRouter;
