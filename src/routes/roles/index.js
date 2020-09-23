const RolesRouter = require('express').Router();
const { CreateRole, GetRoles, DeleteRole } = require('../../controllers/roles');

RolesRouter.get('/', GetRoles);
RolesRouter.delete('/:id', DeleteRole);
RolesRouter.post('/', CreateRole);

module.exports = RolesRouter;
