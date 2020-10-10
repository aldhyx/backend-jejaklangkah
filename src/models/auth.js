require('dotenv').config();
const { dbConnection } = require('../configs/db');

const useDB = `USE ${process.env.DB_NAME}`;
const tableName = 'users';

exports.SignUp = (body) => {
  const {
    role,
    firstname,
    lastname,
    email,
    username,
    password,
    gender,
    birthday,
  } = body;

  // role: 1=super admin; 2=admin/sellers; 3=users
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `${useDB};
      SELECT * FROM ${tableName} WHERE username=? or email=?;
      `,
      [username, email],
      (err, result) => {
        if (err) return reject(new Error(err));
        if (result[1].length > 0) return reject(new Error('Account exists!'));

        dbConnection.query(
          `${useDB}; INSERT INTO ${tableName} (
            role, firstname, lastname, email, username, password, gender, birthday
            ) VALUE(?,?,?,?,?,?,?,?);
            `,
          [
            role,
            firstname,
            lastname,
            email,
            username,
            password,
            gender,
            birthday,
          ],
          (error, result) => {
            if (error) return reject(new Error(error));
            return resolve(result);
          }
        );
      }
    );
  });
};

exports.GetUserData = (username) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `${useDB}; 
        SELECT _id, username, password, role FROM users WHERE username=?;
        `,
      [username],
      (error, result) => {
        if (error) return reject(new Error(error));
        return resolve(result);
      }
    );
  });
};

exports.GetSellerStore = (user_id) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `${useDB}; 
        SELECT _id FROM stores WHERE user_id=?;
        `,
      [user_id],
      (error, result) => {
        if (error || !result) {
          return reject(new Error(error || 'You dont have a store!'));
        }
        return resolve(result);
      }
    );
  });
};
