const { dbConnection } = require('../configs/db');
const { tables, relations } = require('./migrationLists');

// use to create relation between tables
const runRelationsQuery = () => {
  dbConnection.query(
    `use ${process.env.DB_NAME};
        ${relations.join('')};`,
    (error, result) => {
      if (!error) {
        // success create relations
        console.log('Migration Success!');
        return process.exit();
      } else {
        // failed create relations
        console.log('Migration Failed On Create Relations!');
        console.log('Error => ', error);
        return process.exit();
      }
    }
  );
};

// use to create tables
const runTablesQuery = () => {
  dbConnection.query(
    ` CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};
          use ${process.env.DB_NAME};
          ${tables.join('')} `,
    (error, result) => {
      if (!error) {
        // success create database and table
        // then create relations
        runRelationsQuery();
      } else {
        // failed create database or table
        console.log('Migration Failed On Create Tables!');
        console.log('Error => ', error);
        return process.exit();
      }
    }
  );
};

runTablesQuery();
