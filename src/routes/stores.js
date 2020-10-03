const StoresRouter = require('express').Router();
const {
  CreateStore,
  DeleteStore,
  UpdateStore,
  GetStores,
  GetStore,
} = require('../controllers/stores');

StoresRouter.post('/', CreateStore);
StoresRouter.delete('/:id', DeleteStore);
StoresRouter.patch('/:id', UpdateStore);
StoresRouter.get('/', GetStores);
StoresRouter.get('/:id', GetStore);

module.exports = StoresRouter;
