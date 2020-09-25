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
      `${useDB}; INSERT INTO ${tableName} (
        role,
        firstname,
        lastname,
        email,
        username,
        password,
        gender,
        birthday
        ) VALUE(?,?,?,?,?,?,?,?);
        `,
      [role, firstname, lastname, email, username, password, gender, birthday],
      (error, result) => {
        if (error) return reject(new Error(error));
        return resolve(result);
      }
    );
  });
};
