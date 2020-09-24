const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  multipleStatements: true,
});

// connect to mysql server
dbConnection.connect();

module.exports = {
  dbConnection,
};
