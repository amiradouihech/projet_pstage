import React, { useState } from 'react';
import axios from 'axios';

function Connexion() {
    const [values, setValues] = useState({
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
            const response = await axios.post('http://localhost:4000/connexion', values);
            console.log("Logged in Successfully !!");
            
            window.location.href = '/liste_client'; 
        } catch (error) {
            console.error("Erreur lors de la connexion :", error.response.data.error);
            setError("Erreur lors de la connexion");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Connexion</h1>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name="email" className="form-control" id="email" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                    <input type="password" name="password" className="form-control" id="password" onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
                                <a href="/signup">inscrire</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Connexion;
