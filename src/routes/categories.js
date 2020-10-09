const CategoriesRouter = require('express').Router();
const { Authentication, isRoleAdmin } = require('../middleware/auth');
const { validate, Joi } = require('express-validation');

const {
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
  GetCategories,
  GetCategory,
} = require('../controllers/categories');

const validationRules = {
  name: {
    body: Joi.object({
      name: Joi.string().trim().required(),
    }),
  },
  id: {
    params: Joi.object({
      id: Joi.number(),
    }),
  },
};

CategoriesRouter.post(
  '/',
  Authentication,
  isRoleAdmin,
  validate(validationRules.name, { keyByField: true }, {}),
  CreateCategory
);
CategoriesRouter.delete(
  '/:id',
  Authentication,
  isRoleAdmin,
  validate(validationRules.id, { keyByField: true }, {}),
  DeleteCategory
);
CategoriesRouter.patch(
  '/:id',
  Authentication,
  isRoleAdmin,
  validate(
    { ...validationRules.name, ...validationRules.id },
    { keyByField: true },
    {}
  ),
  UpdateCategory
);
CategoriesRouter.get('/', GetCategories);
CategoriesRouter.get('/:id', GetCategory);

module.exports = CategoriesRouter;
