const ProductsRouter = require('express').Router();
const {
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
  GetProducts,
  GetProduct,
} = require('../controllers/products');

ProductsRouter.post('/', CreateProduct);
ProductsRouter.delete('/:id', DeleteProduct);
ProductsRouter.patch('/:id', UpdateProduct);
ProductsRouter.get('/', GetProducts);
ProductsRouter.get('/:id', GetProduct);

module.exports = ProductsRouter;
