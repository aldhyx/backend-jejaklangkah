const {
  UpdateUser,
  UpdateEmail,
  UpdatePassword,
  DeleteUser,
  GetUsers,
  GetUser,
} = require('../models/users');
const bycrypt = require('bcryptjs');

exports.GetUser = async (req, res) => {
  try {
    const resultQuery = await GetUser(req.auth.id);
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

exports.GetUsers = async (req, res) => {
  try {
    const resultQuery = await GetUsers();

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

exports.DeleteUser = async (req, res) => {
  try {
    const resultQuery = await DeleteUser(req.auth.id);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: req.auth.id,
        },
      });
    } else throw new Error('Update Failed');
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

exports.UpdateUser = async (req, res) => {
  try {
    const dataToUpdate = {};
    const fillAble = ['firstname', 'lastname', 'gender', 'birthday'];
    fillAble.forEach((v) => {
      if (req.body[v]) {
        dataToUpdate[v] = req.body[v];
      }
    });

    const resultQuery = await UpdateUser(req.auth.id, dataToUpdate);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: req.auth.id,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          gender: req.body.gender,
          birthday: req.body.birthday,
        },
      });
    } else throw new Error('Update Failed');
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

exports.UpdateUsername = async (req, res) => {
  try {
    const resultQuery = await UpdateUser(req.auth.id, req.body);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: req.auth.id,
          username: req.body.username,
        },
      });
    } else throw new Error('Update Failed');
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

exports.UpdatePassword = async (req, res) => {
  try {
    if (req.body.password !== req.body.passwordConfirmation) {
      throw new Error('Password confirmation does not match!');
    }

    const hashPassword = bycrypt.hashSync(req.body.password);

    const resultQuery = await UpdatePassword(req.auth.id, hashPassword);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: req.params.id,
        },
      });
    } else throw new Error('Update Failed');
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

exports.UpdateEmail = async (req, res) => {
  try {
    const resultQuery = await UpdateEmail(req.auth.id, req.body);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: req.auth.id,
          email: req.body.email,
        },
      });
    } else throw new Error('Update Failed');
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
