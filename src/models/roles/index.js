const { dbConnection } = require('../../configs/db');

const useDB = `USE ${process.env.DB_NAME}`;
const tableName = 'roles';

exports.DeleteRole = (data) => {
  const { id } = data;

  return new Promise((resolve, reject) => {
    dbConnection.query(
      ` ${useDB}; SELECT * FROM ${tableName} WHERE _id=${id};
      `,
      (error, result) => {
        if (error || !result[1][0]) {
          return reject(new Error(`Roles with id ${id} doesn't Exists`));
        }

        dbConnection.query(
          ` ${useDB}; DELETE FROM ${tableName} WHERE _id=${id};
          `,
          (error, result) => {
            if (error) return reject(new Error(error));
            return resolve(result);
          }
        );
      }
    );
  });
};

exports.GetRoles = () => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `${useDB}; SELECT * FROM ${tableName};
      `,
      (error, result) => {
        if (error) return reject(new Error(error));
        return resolve(result);
      }
    );
  });
};

exports.CreateRole = (data) => {
  const { role } = data;

  return new Promise((resolve, reject) => {
    dbConnection.query(
      `${useDB}; INSERT INTO ${tableName} (role) VALUE(?);
      `,
      [role],
      (error, result) => {
        if (error) return reject(new Error(error));
        return resolve(result);
      }
    );
  });
};
