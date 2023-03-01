import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../admin.scss';

import logo from "../../img/logo.png";

import { API_BASE_URL, API_EP_LOGIN } from '../../apiConstantes';

function Dashboard() {
    const navigate = useNavigate();

    const [userToken, setUserToken] = useState(localStorage.getItem('user_token_qomit'));

    useEffect(() => {
        if (!userToken) {
            navigate('/admin');
        }
    }, [userToken, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user_token_qomit');
        setUserToken(null);
    }

    return (
        <>
            <h1>Tableau de bord</h1>
            <div>Token : {userToken} </div>
            <button onClick={handleLogout}>Déconnexion</button>
        </>
    );
}

export default Dashboard;
