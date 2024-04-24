// Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [hideNavbar, setHideNavbar] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setHideNavbar(true);
    navigate('/connexion'); // Naviguer vers la page de connexion
  };

  return (
    <div>
      {!hideNavbar && (
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
      )}
      {!hideNavbar && (
        <button onClick={handleButtonClick}>déconnecxion</button>
      )}
    </div>
  );
};

export default Navbar;
