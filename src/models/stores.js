const { dbConnection } = require('../configs/db');

const useDB = `USE ${process.env.DB_NAME}`;
const tableName = 'stores';

exports.CreateStore = (user_id, body) => {
  const { name, address, city, province, description } = body;

  return new Promise((resolve, reject) => {
    dbConnection.query(
      `
      ${useDB};
      SELECT * FROM ${tableName} WHERE user_id=?;`,
      [user_id],
      (error, result) => {
        if (result[1][0]) {
          return reject(
            new Error(`Cannot create new store, you already has a store!`)
          );
        }

        dbConnection.query(
          `${useDB}; INSERT INTO ${tableName} (
        user_id,
        name,
        address,
        city,
        province,
        description
        ) VALUE(?,?,?,?,?,?);
        `,
          [user_id, name, address, city, province, description],
          (error, result) => {
            if (error) return reject(new Error(error));
            return resolve(result);
          }
        );
      }
    );
  });
};

exports.DeleteStore = (id, user_id) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `
      ${useDB};
      SELECT * FROM ${tableName} WHERE _id=? AND user_id=?;`,
      [id, user_id],
      (error, result) => {
        if (error || !result[1][0]) {
          return reject(new Error(`Store with id ${id} doesn't exists`));
        }

        dbConnection.query(
          `
            ${useDB};
            DELETE FROM ${tableName} WHERE _id=? AND user_id=?;
        `,
          [id, user_id],
          (error, result) => {
            if (error) {
              return reject(new Error(error));
            }
            return resolve(result);
          }
        );
      }
    );
  });
};

exports.UpdateStore = (id, user_id, body) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `
      ${useDB};
      SELECT * FROM ${tableName} WHERE _id=? AND user_id=?`,
      [id, user_id],
      (error, result) => {
        if (error || !result[1][0]) {
          return reject(new Error(`Store with id ${id} doesn't exists`));
        }

        dbConnection.query(
          `
            ${useDB};
            UPDATE ${tableName} SET 
            ${Object.keys(body)
              .map((v) => `${v}='${body[v]}'`)
              .join(',')}
            WHERE _id=? AND user_id=?;
        `,
          [id, user_id],
          (error, result) => {
            if (error) {
              return reject(new Error(error));
            }
            return resolve(result);
          }
        );
      }
    );
  });
};

exports.GetStores = () => {
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

exports.GetStore = (id, user_id) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `${useDB}; SELECT * FROM ${tableName} WHERE _id=? AND user_id=?;
      `,
      [id, user_id],
      (error, result) => {
        if (error || !result[1][0]) {
          return reject(new Error(error || 'Store is not exists!'));
        }
        return resolve(result);
      }
    );
  });
};
