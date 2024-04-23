import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/signup', values);
            const token = response.data.token;
            // Stockez le token JWT dans le stockage local ou les cookies
            localStorage.setItem('token', token);
            console.log("Registered and Logged in Successfully !!");
            window.location.href = '/liste_client'; 
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                console.error("Erreur lors de l'inscription :", error.response.data.error);
                setError(error.response.data.error);
            } else {
                console.error("Erreur lors de l'inscription :", error);
                setError("Une erreur inattendue s'est produite.");
            }
        }
    };

    return (
        <div>
            <h1>Inscription</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="form-label">Nom</label>
                <input type="text" name="name" className='form-control' id="name" onChange={handleChange} required />
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="email" className='form-control' id="email" onChange={handleChange} required />
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input type="password" name="password" className='form-control' id="password" onChange={handleChange} required />
                <button type="submit" className="">S'inscrire</button>
            </form>
        </div>
    );
}

export default Signup;
