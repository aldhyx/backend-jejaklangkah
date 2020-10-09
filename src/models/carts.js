const { dbConnection } = require('../configs/db');

const useDB = `USE ${process.env.DB_NAME}`;
const tableName = 'shopping_carts';

exports.GetItems = (id) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `${useDB}; SELECT * FROM cart_items WHERE shopping_cart_id=${id} ;
      `,
      (error, result) => {
        if (error) return reject(new Error(error));
        return resolve(result);
      }
    );
  });
};

exports.AddItem = (user_id, body) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `${useDB};
      SELECT * FROM ${tableName} WHERE user_id=${user_id};
      `,
      (error, result) => {
        // jika tidak ada, then create cart
        if (error || !result[1][0]) {
          dbConnection.query(
            `${useDB};
            INSERT INTO ${tableName} (user_id) VALUE(?);
            `,
            [user_id],
            (error, result) => {
              if (error || !result[1][0]) {
                return reject(new Error(error));
              }
            }
          );
        }

        // insert product to cart_items
        dbConnection.query(
          `${useDB};
          SELECT _id FROM ${tableName} WHERE user_id=${user_id};
          `,
          (error, result) => {
            if (error || !result[0]) {
              return reject(new Error(error));
            }
            const { _id } = result[1][0]; //carts id by users

            dbConnection.query(
              `${useDB};
              INSERT INTO cart_items (product_id, shopping_cart_id, quantity) 
              VALUE(?,?,?);
              `,
              [body.product_id, _id, body.quantity],
              (error, result) => {
                if (error) {
                  return reject(new Error(error));
                }
                return resolve(result);
              }
            );
          }
        );
      }
    );
  });
};

exports.DeleteItem = (id) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `
      ${useDB};
      SELECT * FROM cart_items WHERE _id=${id};`,
      (error, result) => {
        if (error || !result[1][0]) {
          return reject(new Error(`Items with id ${id} doesn't exists`));
        }

        dbConnection.query(
          `
            ${useDB};
            DELETE FROM cart_items WHERE _id=${id}
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
