const CategoriesRouter = require('express').Router();
const {
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
  GetCategories,
  GetCategory,
} = require('../controllers/categories');

CategoriesRouter.post('/', CreateCategory);
CategoriesRouter.delete('/:id', DeleteCategory);
CategoriesRouter.patch('/:id', UpdateCategory);
CategoriesRouter.get('/', GetCategories);
CategoriesRouter.get('/:id', GetCategory);

module.exports = CategoriesRouter;
