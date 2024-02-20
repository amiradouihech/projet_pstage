const express = require('express')
const cors = require('cors');
const app = express();
const PORT = 3000;

const corsOptions = {
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(express.json());

//app.use('/api/products', productRoutes);


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'projet'
});

connection.connect();

module.exports = connection;
app.get('/liste', (req, res) => {
  connection.query('SELECT * FROM produit', (error, results, fields) => {
     if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Send the JSON response
   return( res.json(results));
  });
});



////add Produit

/*
app.post('/add', (req, res) => {
  const productData = req.body;
  ajouter.Ajouter(productData, (error, results) => {
    if (error) {
      res.status(500).json({ error: ' Server Error' });
    } else {
      res.json(results);
    }
  });
});


app.put('/edit/:id', (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;
  edit.edit(productId, updatedData, (error, results) => {
    if (error) {
      res.status(500).json({ error: ' Server Error' });
    } else {
      res.json(results);
    }
  });
});


app.delete('/delete/:id', (req, res) => {
  const productId = req.params.productId;
  deelete.Delete(productId, (error, results) => {
    if (error) {
      res.status(500).json({ error: ' Server Error' });
    } else {
      res.json(results);
    }
  });
});

*/