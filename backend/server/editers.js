const mysql = require('mysql');

function Edit(productId, updatedData, callback) {
  const query = 'UPDATE projet SET ? WHERE id = ?';
  db.query(query, [updatedData, productId], (error, results, fields) => {
    callback(error, results);
  });
}

module.exports = { Edit };
