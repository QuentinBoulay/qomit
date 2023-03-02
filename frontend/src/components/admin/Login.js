import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../admin.scss';

import logo from "../../img/logo.png";

import { API_BASE_URL, API_EP_LOGIN } from '../../apiConstantes';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new URLSearchParams();
    data.append('email', email);
    data.append('password', password);

    try {
      const response = await fetch(API_BASE_URL + API_EP_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
      });

      const jsonData = await response.json();
      console.log(jsonData);

      if (jsonData.error === 0) {
        localStorage.setItem('user_token_qomit', jsonData.use_token);
        localStorage.setItem('user_id_qomit', jsonData.use_id);
        navigate('/dashboard');
      }
      else {
        console.log(jsonData.message);
        const errorDiv = document.querySelector('.error_message');
        errorDiv.textContent = jsonData.message;
      }

      const userToken = localStorage.getItem('user_token_qomit');
      const userId = localStorage.getItem('user_id_qomit');
      console.log(userToken);
      console.log(userId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="body-admin">
      <div className='login-page'>
        <div className="logo">
          <img src={logo} alt="logo QOMIT" />
        </div>
        <div className="form_block">
          <div className='form_container'>
            <h1 className='font-size-22'>Accéder à votre outil de suivi de projet</h1>
            <form onSubmit={handleSubmit}>
              <div className='input_block'>
                <label htmlFor="email">Identifiant</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className='input_block'>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit">Connexion</button>
            </form>
            <div className='error_message'>

            </div>
          </div>
        </div>
      </div>


    </div>

  );
}

export default Login;
