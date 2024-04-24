import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Listrouge() {
  const [Tab, setTab] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/listrouge')
      .then((result) => { setTab(result.data); })
      .catch((error) => { console.error('error fetching data ', error); });
  }, []);


  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Tab.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Tab.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div style={{}}>
      <div>
        <h1 style={{ color: 'red' }}>Lister les produits qui ont la quantité la plus basse</h1>
        <table className="table table-striped">
          <thead className="table-danger">
            <tr>
              <th>ID</th>
              <th>Libellé</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>cathégorie</th>
              <th>sousCategories</th>
            </tr>
          </thead>
          <tbody>
            {records.map((product) => (
              <tr className="product" key={product.id_produit}>
                <td>{product.id_produit}</td>
                <td>{product.lib_produit}</td>
                <td>{product.description}</td>
                <td>{product.prix}</td>
                <td>
                  {product.quantite}
                </td>
                <td>
                  {product.id_cathegori}
                </td>
                <td>
                  {product.id_sous_categorie}
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

export default Listrouge;
