

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projeta'
});

connection.connect();


function generateToken(userId) {
  return jwt.sign({ userId }, 'votre_secret_key', { expiresIn: '1h' }); }

// Route de création de compte avec génération de token JWT
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Hachage du mot de passe avec un coût de hachage de 10
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insérez le mot de passe haché dans la base de données
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [name, email, hashedPassword];
    
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erreur lors de la création du compte" });
      } else {
        // Si le compte est créé avec succès, générez un token JWT avec l'ID de l'utilisateur
        const userId = result.insertId; // Utilisez l'ID de l'utilisateur inséré dans la base de données
        const token = generateToken(userId);
        
        // Envoyer le token JWT au client
        return res.status(200).json({ message: "Compte créé avec succès", token });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la création du compte" });
  }
});

async function verifyUser(email, password) {
  try {
    const sql = "SELECT * FROM login WHERE email = ?";
    const [rows] = await query(sql, [email]);
    
    if (rows.length === 0) {
      return null; // Utilisateur non trouvé
    }

    const user = rows;

    // Vérifier si user.password est défini avant de comparer
    if (user && user.password) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch);
      if (passwordMatch) {
        return user; // Les informations d'identification sont valides
      } else {
        return null; // Mot de passe incorrect
      }
    } else {
      return null; // Le mot de passe n'est pas défini pour cet utilisateur
    }
  } catch (error) {
    console.log("test");
    throw error; // Propager l'erreur vers le gestionnaire de route
  }
}

// Route de connexion
app.post('/connexion', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await verifyUser(email, password);
    console.log('user :',user);
    if (user) {
      // Générer un jeton JWT avec l'ID de l'utilisateur
      const token = generateToken(user.id); // Utilisez l'ID de l'utilisateur
      res.status(200).json({ message: "Connexion réussie", token });
    } else {
      res.status(401).json({ error: "Identifiants incorrects" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
});

// Fonction de requête générique pour gérer les requêtes SQL
const query = async (sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

app.get('/liste_client', async (req, res) => {
  try {
    const results = await query('SELECT * FROM produit');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/liste_cat1', async (req, res) => {
  try {
    const results = await query('SELECT * FROM produit where id_cathegori=1');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/liste_cat2', async (req, res) => {
  try {
    const results = await query('SELECT * FROM produit where id_cathegori=2');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/liste_cat3', async (req, res) => {
  try {
    const results = await query('SELECT * FROM produit where id_cathegori=3');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/listrouge', (req, res) => {
  connection.query('SELECT * FROM produit where quantite<1000', (error, results) => {
    if (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/listbleu', (req, res) => {
  connection.query('SELECT * FROM produit where quantite>1000', (error, results) => {
    if (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});
app.get('/liste_cat4', async (req, res) => {
  try {
    const results = await query('SELECT * FROM produit where id_cathegori=4');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/liste_cathegori', (req, res) => {
  connection.query('SELECT * FROM cathegori', (error, results) => {
    if (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/sousCategories/:categorieId', (req, res) => {
  const categorieId = req.params.categorieId;
  connection.query('SELECT libelle FROM subcategorie WHERE cat = ?', [categorieId], (error, results) => {
    if (error) {
      console.error('Error fetching souscategories:', error);
      res.status(500).json({ error: 'Internal server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/detail_produit/:id', (req, res) => {
  const sql = "SELECT * FROM produit WHERE id_produit=?";
  const id = req.params.id;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log(result);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json(result);
  });
});


app.post('/ajouter_categorie', async (req, res) => {
  const { id, id_soucat, title, id_prod } = req.body;
  try {
    await connection.query('INSERT INTO cathegori (id, id_soucat, title, id_prod) VALUES (?, ?, ?, ?)', [id, id_soucat, title, id_prod]);
    res.send('Catégorie ajoutée avec succès');
  } catch (error) {
    console.error('Error adding cathegori:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/ajouter', async (req, res) => {
  const { libelle, description, prix, quantite, id_categorie ,id_sous_categorie} = req.body;
  console.log(req.body);
  console.log(id_categorie);

  const sql = "INSERT INTO `produit`(`lib_produit`, `id_cathegori`, `description`, `prix`, `quantite`,`id_sous_categorie`) VALUES (?,?,?,?,?,?)";
  const values = [libelle, id_categorie, description, prix, quantite,id_sous_categorie];


  try {
    const result = await connection.query(sql, values);
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi de la requête SQL :", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
app.put('/editer/:id', (req, res) => {
  const { id } = req.params;
  const { libelle, description, prix, quantite } = req.body;
  const sql = "UPDATE produit SET lib_produit=?, description=?, prix=?, quantite=? WHERE id_produit=?";
  connection.query(sql, [libelle, description, prix, quantite, id], (err, result) => {
    if (err) return res.json({ Error: err });
    console.log(result);
    return res.json({ Success: 'Product updated successfully' });
  });
});




///update d'une cathégorie
app.put('/editer_categorie/:id', (req, res) => {
  const categorieId = req.params.id;
  const { libelle, description } = req.body;

  const sql = 'UPDATE cathegori SET libelle=?, description=? WHERE id=?';
  connection.query(sql, [libelle, description, categorieId], (error, results, fields) => {
    if (error) {
      console.error('Error updating cathegori:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.send('Catégorie mise à jour avec succès');
  });
});
///suprimer d'une cathégorie
app.delete('/supprimer_categorie/:id', (req, res) => {
  const categorieId = req.params.id;

  connection.query('DELETE FROM cathegori WHERE id = ?', [categorieId], (error, results, fields) => {
    if (error) {
      console.error('Error deleting cathegori:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ message: 'Catégorie supprimée avec succès' });
  });
});
app.put('/editer/:id', (req, res) => {
  const productId = req.params.id;
  const { libelle, description, prix, quantite } = req.body;

  console.log("Received data:", { libelle, description, prix, quantite, productId });

  const sql = 'UPDATE produit SET libelle=?, description=?, prix=?, quantite=? WHERE id=?';
  connection.query(sql, [libelle, description, prix, quantite, productId], (error, results, fields) => {
    if (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.send('Produit mis à jour avec succès');
  });
});
app.delete('/supprimer/:productId', (req, res) => {
  const productId = req.params.productId;

  console.log('Deleting product with ID:', productId);

  connection.query('DELETE FROM produit WHERE id_produit = ?', [productId], (error, results, fields) => {
    if (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ message: 'Product deleted successfully' });
  });
});



app.listen(4000, () => {
  console.log('Server is running on port');
});

