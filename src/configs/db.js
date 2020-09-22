require('dotenv').config();
const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  multipleStatements: true,
});

// connect to mysql server
dbConnection.connect();

const runQuery = (query, callBack) => {
  const newQuery = `use ${process.env.DB_NAME}; ${query}`;
  return dbConnection.query(newQuery, callBack);
};

module.exports = {
  dbConnection,
  runQuery,
};
