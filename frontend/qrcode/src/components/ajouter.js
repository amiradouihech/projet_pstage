import React, { useState } from 'react';
import axios from 'axios';
import Tpp from './testdropdown';

function Ajouter() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [quantite, setQuantite] = useState('');

  const [libelleValid, setLibelleValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [prixValid, setPrixValid] = useState(true);
  const [quantiteValid, setQuantiteValid] = useState(true);
  const [categoryValid, setCategoryValid] = useState(true);
  const [subCategoryValid, setSubCategoryValid] = useState(true);

  const [tab, setTab] = useState({
    libelle: '',
    description: '',
    prix: '',
    quantite: '',
    id_categorie: selectedCategory,
    id_sous_categorie: selectedSubCategory,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTab({ ...tab, [name]: value });
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCategoryValid(true);
  };

  const handleSubCategorySelect = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
    setSubCategoryValid(true);
  };

  const envoyer = async (e) => {
    e.preventDefault();

    // Vérifier si les champs obligatoires sont remplis
    if (!tab.libelle || !tab.description || !tab.prix || !tab.quantite || !selectedCategory || !selectedSubCategory) {
      setLibelleValid(!!tab.libelle);
      setDescriptionValid(!!tab.description);
      setPrixValid(!!tab.prix);
      setQuantiteValid(!!tab.quantite);
      setCategoryValid(!!selectedCategory);
      setSubCategoryValid(!!selectedSubCategory);
      return;
    }

    // Vérifier si le prix est supérieur à 0
    if (tab.prix <= 0) {
      setPrixValid(false);
      return;
    }

    // Vérifier si la quantité est supérieure à 0
    if (tab.quantite <= 0) {
      setQuantiteValid(false);
      return;
    }

    try {
      const dataToSend = {
        libelle: tab.libelle,
        description: tab.description,
        prix: tab.prix,
        quantite: tab.quantite,
        id_categorie: selectedCategory,
        id_sous_categorie: selectedSubCategory,
      };

      await axios.post('http://localhost:4000/ajouter', dataToSend);

      // Rediriger en fonction de la catégorie sélectionnée
      if(selectedCategory==1){
        window.location.href = '/licat1';
      }
      else{
        if(selectedCategory==2){
          window.location.href = '/licat2';
        }
      }
      if(selectedCategory==3){
        window.location.href = '/licat3';
      }
      else{
        if(selectedCategory==4){
          window.location.href = '/licat4';
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête POST :", error);
    }
  };

  return (
    <div>
      <Tpp onSelectCathegori={handleCategorySelect} onSelectSubCat={handleSubCategorySelect} />

      <form onSubmit={envoyer}>
        <div className="mb-3">
          <label htmlFor="libelle" className="form-label">
            Libellé
          </label>
          <input type="text" className={`form-control ${!libelleValid && 'is-invalid'}`} id="libelle" name="libelle" onChange={handleChange} required/>
          {!libelleValid && <div className="invalid-feedback">Ce champ est obligatoire.</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input type="text" className={`form-control ${!descriptionValid && 'is-invalid'}`} id="description" name="description" onChange={handleChange} required/>
          {!descriptionValid && <div className="invalid-feedback">Ce champ est obligatoire.</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="prix" className="form-label">
            Prix
          </label>
          <input type="number" className={`form-control ${!prixValid && 'is-invalid'}`} id="prix" name="prix" onChange={handleChange} required />
          {!prixValid && <div className="invalid-feedback">Le prix doit être supérieur à zéro.</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="quantite" className="form-label">
            Quantité
          </label>
          <input type="number" className={`form-control ${!quantiteValid && 'is-invalid'}`} id="quantite" name="quantite" onChange={handleChange} required />
          {!quantiteValid && <div className="invalid-feedback">La quantité doit être supérieure à zéro.</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default Ajouter;