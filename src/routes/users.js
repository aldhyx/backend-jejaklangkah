const UsersRouter = require('express').Router();
const {
  UpdateUser,
  UpdateUsername,
  UpdatePassword,
  UpdateEmail,
  DeleteUser,
  GetUsers,
} = require('../controllers/users');

UsersRouter.get('/', GetUsers);
UsersRouter.patch('/:id', UpdateUser);
UsersRouter.patch('/username/:id', UpdateUsername);
UsersRouter.patch('/password/:id', UpdatePassword);
UsersRouter.patch('/email/:id', UpdateEmail);
UsersRouter.delete('/:id', DeleteUser);

module.exports = UsersRouter;
