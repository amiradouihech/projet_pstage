import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tpp = ({ onSelectCathegori, onSelectSubCat }) => {
  const [cathegori, setCathegori] = useState('');
  const [subcat, setSubcat] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/liste_cathegori')
      .then((result) => { setCategories(result.data); })
      .catch((error) => { console.error('error fetching data ', error); });
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    setCathegori(selectedCategoryId);

    try {
      const res = await axios.get(`http://localhost:4000/sousCategories/${selectedCategoryId}`);
      setSubcategories(res.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des sous-catégories depuis l\'API :', err);
    }

    onSelectCathegori(selectedCategoryId, null);
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubcategoryId = e.target.value;
    setSubcat(selectedSubcategoryId);
    onSelectSubCat(cathegori, selectedSubcategoryId);
  };

  return (
    <div>
      <select onChange={(e) => handleCategoryChange(e)} value={cathegori} className="cat">
        <option value="">Sélectionner Catégorie</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.type}
          </option>
        ))}
      </select>

      <select onChange={(e) => handleSubcategoryChange(e)} value={subcat} disabled={cathegori === ''}>
        <option value="">Sélectionner Sous catégorie</option>
        {subcategories.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.libelle}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Tpp;
