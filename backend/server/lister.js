const mysql = require('mysql');

function ListerPrduit(criteria, callback) {
  const query = 'SELECT * FROM produit ';
  mysql.query(query, criteria, (error, results, fields) => {
    callback(error, results);
  });
}

module.exports = { ListerPrduit };
