require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SignUp, GetUserData } = require('../models/auth');

exports.SignUp = async (req, res, next) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password);
    req.body.password = hashPassword;

    const resultQuery = await SignUp(req.body);
    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: resultQuery[1].insertId,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          username: req.body.username,
          gender: req.body.gender,
          birthday: req.body.birthday,
        },
      });
    } else throw new Error('Sign Up Failed!');
  } catch (error) {
    console.log('Error on auth controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await GetUserData(username);

    if (result[1].length > 0) {
      const dataUser = result[1][0];

      if (bcrypt.compareSync(password, dataUser.password)) {
        const token = jwt.sign(
          {
            id: dataUser._id,
            username: dataUser.username,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1D',
          }
        );

        res.status(200).send({
          status: 'success',
          result: {
            accessToken: token,
          },
        });
      } else {
        throw new Error('username or password invalid!');
      }
    } else {
      throw new Error('username or password invalid!');
    }
  } catch (error) {
    console.log('Error on auth controller => ', error);
    res.status(401).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};
