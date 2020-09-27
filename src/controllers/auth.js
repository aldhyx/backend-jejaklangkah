const bycrypt = require('bcryptjs');
const { SignUp } = require('../models/auth');

exports.SignUp = async (req, res, next) => {
  try {
    if (!(Object.keys(req.body).length > 0)) {
      throw new Error('Please add data to update');
    }

    const {
      role,
      firstname,
      lastname,
      email,
      username,
      password,
      gender,
      birthday,
    } = req.body;

    // role accept only user or seller
    if (role == 'superadmin') {
      throw new Error('Role is invalid');
    }

    const hashPassword = bycrypt.hashSync(password);
    req.body.password = hashPassword;

    const resultQuery = await SignUp(req.body);
    console.log(resultQuery);
    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: resultQuery[1].insertId,
          firstname,
          lastname,
          email,
          username,
          gender,
          birthday,
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
