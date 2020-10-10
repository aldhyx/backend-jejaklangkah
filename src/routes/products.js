const ProductsRouter = require('express').Router();
const UploadFile = require('../middleware/uploadFile');
const {
  Authentication,
  isRoleSeller,
  isHaveStore,
} = require('../middleware/auth');
const { validate, Joi } = require('express-validation');

const {
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
  GetProducts,
  GetProduct,
} = require('../controllers/products');

const validationRules = {
  create: {
    body: Joi.object({
      category_id: Joi.number().required(),
      name: Joi.string().trim().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
      description: Joi.string().trim().required(),
    }),
  },
  id: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
};

ProductsRouter.post(
  '/',
  Authentication,
  isRoleSeller,
  isHaveStore,
  UploadFile.single('image'),
  validate(validationRules.create, { keyByField: true }, {}),
  CreateProduct
);

ProductsRouter.delete(
  '/:id',
  Authentication,
  isRoleSeller,
  isHaveStore,
  validate(validationRules.id, { keyByField: true }, {}),
  DeleteProduct
);
ProductsRouter.patch(
  '/:id',
  Authentication,
  isRoleSeller,
  isHaveStore,
  validate(validationRules.id, { keyByField: true }, {}),
  UpdateProduct
);
ProductsRouter.get('/', GetProducts);
ProductsRouter.get(
  '/:id',
  validate(validationRules.id, { keyByField: true }, {}),
  GetProduct
);

module.exports = ProductsRouter;
