const { CreateRole, GetRoles, DeleteRole } = require('../../models/roles');

exports.DeleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).send({
        status: 'error',
        result: {
          message: 'Invalid input parameter',
        },
      });
    }

    const resultQuery = await DeleteRole(req.params);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: { id },
      });
    } else throw new Error('Delete Failed');
  } catch (error) {
    console.log('Error on roles controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};

exports.GetRoles = async (req, res) => {
  try {
    const resultQuery = await GetRoles();

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: resultQuery[1],
      });
    } else throw new Error('Get Failed');
  } catch (error) {
    console.log('Error on roles controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};

exports.CreateRole = async (req, res, next) => {
  const { role } = req.body;

  try {
    if (!role) {
      res.status(400).send({
        status: 'error',
        result: {
          message: 'Invalid input parameter',
        },
      });
    }

    const resultQuery = await CreateRole(req.body);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          role,
        },
      });
    } else throw new Error('Create Failed');
  } catch (error) {
    console.log('Error on roles controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};
