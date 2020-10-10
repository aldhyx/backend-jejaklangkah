const { dbConnection } = require('../configs/db');

const useDB = `USE ${process.env.DB_NAME}`;
const tableName = 'categories';

exports.CreateCategory = (body) => {
  const { name } = body;

  return new Promise((resolve, reject) => {
    dbConnection.query(
      `${useDB}; INSERT INTO ${tableName} (
        name
        ) VALUE(?);
        `,
      [name],
      (error, result) => {
        if (error) return reject(new Error(error));
        return resolve(result);
      }
    );
  });
};

exports.DeleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `
      ${useDB};
      SELECT * FROM ${tableName} WHERE _id=${id};`,
      (error, result) => {
        if (error || !result[1][0]) {
          return reject(new Error(`Category with id ${id} doesn't exists`));
        }

        dbConnection.query(
          `
            ${useDB};
            DELETE FROM ${tableName} WHERE _id=${id}
        `,
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

exports.UpdateCategory = (id, body) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `
      ${useDB};
      SELECT * FROM ${tableName} WHERE _id=${id};`,
      (error, result) => {
        if (error || !result[1][0]) {
          return reject(new Error(`Category with id ${id} doesn't exists`));
        }

        dbConnection.query(
          `
            ${useDB};
            UPDATE ${tableName} SET 
            ${Object.keys(body)
              .map((v) => `${v}='${body[v]}'`)
              .join(',')}
            WHERE _id=${id};
        `,
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

exports.GetCategories = (params) => {
  return new Promise((resolve, reject) => {
    const { limit, page, sort, search } = params;

    const condition = `
    ${search ? `WHERE name LIKE '%${search}%'` : ''}
    ${sort ? `ORDER BY ${sort.key} ${sort.value}` : ''}
    LIMIT ${parseInt(limit)} OFFSET ${(parseInt(page) - 1) * parseInt(limit)}
    `;

    dbConnection.query(
      `${useDB}; 
      SELECT COUNT(*) AS total from ${tableName} ${condition.substring(
        0,
        condition.indexOf('LIMIT')
      )};
      SELECT * FROM ${tableName} ${condition};
      `,
      (error, result) => {
        if (error) return reject(new Error(error));
        return resolve(result);
      }
    );
  });
};

exports.GetCategory = (id) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `${useDB}; SELECT * FROM ${tableName} WHERE _id=${id};
      `,
      (error, result) => {
        if (error) return reject(new Error(error));
        return resolve(result);
      }
    );
  });
};
