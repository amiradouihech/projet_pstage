import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Listeclient() {
  const [Tab, setTab] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const navigate = useNavigate();

  useEffect(() => {
      const fetchAllTab = async () => {
        try {
          const res = await axios.get('http://localhost:4000/liste_cat4');
          console.log('Data from API:', res.data);
          setTab(res.data);
        } catch (err) {
          console.error('Error fetching data from API:', err);
        }
      };
  
      fetchAllTab();
    }, []);

  const handleAjouterClick = () => {
    navigate('/ajouter');
  };

  const handleEditerClick = (productId, libelle, des, qte, prix) => {
    navigate(`/editer/${productId}/${libelle}/${des}/${qte}/${prix}`);
  };

  const handleSupprimerClick = async (productId) => {
    try {
      console.log('Deleting product with ID:', productId);
      await axios.delete(`http://localhost:4000/supprimer/${productId}`);
      const res = await axios.get('http://localhost:4000/liste_client');
      setTab(res.data);
    } catch (error) {
      console.error('Error deleting product:', error.response?.data || error.message);
    }
  };

  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Tab.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Tab.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div style={{}}>
      <div>
        <h1 style={{ color: 'blue' }}>Lister produit</h1>
        <button type="button" className="btn btn-success" onClick={handleAjouterClick}>
          Ajouter
        </button>
        <table className="table table-striped">
          <thead className="table-danger">
            <tr>
              <th>ID</th>
              <th>Libellé</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((product) => (
              <tr className="product" key={product.id_produit}>
                <td>{product.id_produit}</td>
                <td>{product.lib_produit}</td>
                <td>{product.description}</td>
                <td>{product.prix}</td>
                <td style={{ background: parseInt(product.quantite, 10) < 1000 ? 'red' : 'blue' }}>
                  {product.quantite}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleSupprimerClick(product.id_produit)}
                  >
                    Supprimer
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEditerClick(product.id_produit,product.lib_produit,product.description,product.quantite,product.prix)}
                  >
                    Éditer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="pagination">
        <li className="page-item">
          <a href="#" className="page-link" onClick={prePage}>
            Prev
          </a>
        </li>
        {numbers.map((n, i) => (
          <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
            <a href="#" className="page-link" onClick={() => changeCPage(n)}>
              {n}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a href="#" className="page-link" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
    </div>
  );

  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id_produit) {
    setCurrentPage(id_produit);
  }

  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default Listeclient;
