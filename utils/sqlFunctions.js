const mysql = require('mysql');
const con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.password,
  database: "ngo"
})

const checkRecordExists = (tableName, column, value) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
  
      con.query(query, [value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length ? results[0] : null);
        }
      });
    });
  };


  const insertRecord = (tableName, record) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ${tableName} SET ?`;
  
      con.query(query, [record], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };


  
module.exports = {
    checkRecordExists,
    insertRecord,
  };