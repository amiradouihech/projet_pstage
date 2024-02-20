const mysql = require('mysql');
function Ajouter(productData, callback) {
  const query = 'INSERT INTO produit';
  db.query(query, productData, (error, results, fields) => {
    callback(error, results);
  });
}

module.exports = { Ajouter };