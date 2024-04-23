import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/liste_produit">ListeProduit</Link>
            <Link className="nav-item nav-link" to="/listerouge">Liste de repture de stock</Link>
            <Link className="nav-item nav-link" to="/listebleu">Liste des produit quantité se augmente</Link>
            <Link className="nav-item nav-link" to="/connexion">Connection</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
