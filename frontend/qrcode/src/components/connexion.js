import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Importer useHistory pour la redirection

function Connexion() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const history = useHistory(); // Utiliser useHistory pour la redirection

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/connexion', values);
            console.log("Logged in Successfully !!");
            // Rediriger l'utilisateur vers une autre page après la connexion réussie
            history.push('/liste_client'); // Utiliser history.push pour la redirection
        } catch (error) {
            console.error("Erreur lors de la connexion :", error.response.data.error);
            setError(error.response.data.error);
        }
    };

    return (
        <div>
            <h1>Connexion</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="email" className='form-control' id="email" onChange={handleChange} />
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input type="password" name="password" className='form-control' id="password" onChange={handleChange} />
                <button type="submit" className="">Se connecter</button>
            </form>
        </div>
    );
}

export default Connexion;
