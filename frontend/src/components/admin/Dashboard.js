import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../admin.scss';

import NavAdmin from '../admin/Templates/NavAdmin';


import { API_BASE_URL, API_EP_LOGIN } from '../../apiConstantes';

function Dashboard() {
    const activePage = "dashboard";

    const navigate = useNavigate();

    const [userToken, setUserToken] = useState(localStorage.getItem('user_token_qomit'));
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        if (!userToken) {
            navigate('/admin');
        }
    }, [userToken, navigate]);



    return (
        <div className='body-admin'>
            <div className='page'>
                <div className='nav_admin'>
                    <NavAdmin activeLink={activePage} />
                </div>
                <div className='page_block'>
                    <h1>Tableau de bord</h1>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
