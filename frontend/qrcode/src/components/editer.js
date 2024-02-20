import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './stylecss.css'
function Editer() {
  const navigate = useNavigate();
  const { id, lib, des, qte, pr } = useParams();
  
  const [libelle, setLibelle] = useState(lib);
  const [description, setDescription] = useState(des);
  const [prix, setPrix] = useState(pr);
  const [quantite, setQuantite] = useState(qte);
  const [libelleValid, setLibelleValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [prixValid, setPrixValid] = useState(true);
  const [quantiteValid, setQuantiteValid] = useState(true);
  const envoyer = async (e) => {
    e.preventDefault();
    if (!libelle || !description || !prix || !quantite ) {
      setLibelleValid(!!libelle);
      setDescriptionValid(!!description);
      setPrixValid(!!prix);
      setQuantiteValid(!!quantite);
      return;
    }
    if (prix <= 0) {
      setPrixValid(false);
      return;
    }

    // Vérifier si la quantité est supérieure à 0
    if (quantite <= 0) {
      setQuantiteValid(false);
      return;
    }
    try {
      await axios.put(`http://localhost:4000/editer/${id}`, {
        libelle,
        description,
        prix,
        quantite,
      });
      navigate('/liste_client');
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête PUT :", error);
    }
  };

  return (
    <div  className='aa'>
      <form onSubmit={envoyer}>
        <div className="mb-3">
          <label htmlFor="libelle" className="form-label">
            Libellé
          </label>
          <input
            type="text"
            className={`form-control ${!libelleValid && 'is-invalid'}`}
            id="libelle"
            name="libelle"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
          />
          {!libelleValid && <div className="invalid-feedback">Ce champ est obligatoire.</div>}

        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className={`form-control ${!descriptionValid && 'is-invalid'}`}
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {!descriptionValid && <div className="invalid-feedback">Ce champ est obligatoire.</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="prix" className="form-label">
            Prix
          </label>
          <input
            type="number"
            className={`form-control ${!prixValid && 'is-invalid'}`}
            id="prix"
            name="prix"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
          />
          {!prixValid && <div className="invalid-feedback">Le prix doit être supérieur à zéro.</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="quantite" className="form-label">
            Quantité
          </label>
          <input
            type="number"
            className={`form-control ${!quantiteValid && 'is-invalid'}`} 
            id="quantite"
            name="quantite"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
          />
           {!quantiteValid && <div className="invalid-feedback">La quantité doit être supérieure à zéro.</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Éditer
        </button>
      </form>
    </div>
  );
}

export default Editer;
