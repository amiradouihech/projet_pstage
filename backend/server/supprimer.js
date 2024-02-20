const mysql = require('mysql');
function Delete(productId, callback) {
  const query = 'DELETE FROM projet WHERE id = ?';
  db.query(query, productId, (error, results, fields) => {
    callback(error, results);
  });
}

module.exports = { Delete };
