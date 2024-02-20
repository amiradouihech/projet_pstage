import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListeProduits from './components/listeproduit';
import EditerProduit from './components/editer';
import AjouterProduit from './components/ajouter';
import Listeclient from './components/listeclient';
import Listproduitcata4 from './components/Listproduitcata4';
import Listproduitcata1 from './components/listcat1';
import Listproduitcata2 from './components/Listproduitcata2';
import Listproduitcata3 from './components/Listproduitcata3';
import Listrouge from './components/listrouge';
import ListeBleu from './components/listebleu';
import Connexion from './components/connexion';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Tpp from './components/testdropdown';
import Login from './components/signup';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Login/>}/>
          <Route path="/drop" element={<Tpp />} />
          <Route path="/liste_produit" element={<ListeProduits />} />
          <Route path="/licat1" element={<Listproduitcata1 />} />
          <Route path="/licat2" element={<Listproduitcata2 />} />
          <Route path="/licat3" element={<Listproduitcata3 />} />
          <Route path="/licat4" element={<Listproduitcata4 />} />
          <Route path="/liste_client" element={<Listeclient />} />
          <Route path="/editer/:id/:lib/:des/:qte/:pr" element={<EditerProduit />} />
          <Route path="/ajouter" element={<AjouterProduit />} />
          <Route path="/listerouge" element={<Listrouge/>}/>
          <Route path="/listebleu" element={<ListeBleu />} />
          <Route path='/connexion' element={<Connexion/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
