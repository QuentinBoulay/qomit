import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../../admin.scss';

import NavAdmin from '../admin/Templates/NavAdmin';


import { API_BASE_URL, API_EP_USERS, API_EP_LAST_PROJECT } from '../../apiConstantes';

function Dashboard() {
    const activePage = "dashboard";

    const navigate = useNavigate();

    const [userToken, setUserToken] = useState(localStorage.getItem('user_token_qomit'));
    const [userId, setUserId] = useState(localStorage.getItem('user_id_qomit'));

    const [lastProject, setlastProject] = useState(null);

    useEffect(() => {
        if (!userToken) {
            navigate('/admin');
        }
    }, [userToken, navigate]);

    useEffect(() => {
        fetch(`${API_BASE_URL}${API_EP_USERS}/${userId}${API_EP_LAST_PROJECT}`)
            .then((response) => response.json())
            .then((lastProject) => setlastProject(lastProject));
    }, [userId]);

    const getColor = (pro_sta_states) => {
        switch (pro_sta_states) {
            case 0:
                return { backgroundColor: '#FBFBFB' };
            case 1:
                return { backgroundColor: '#ACAAFA' };
            case 2:
                return { backgroundColor: '#5955F4' };
            default:
                return {};
        }
    };

    if (!lastProject) {
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

    return (
        <div className='body-admin'>
            <div className='page'>
                <div className='nav_admin'>
                    <NavAdmin activeLink={activePage} />
                </div>
                <div className='page_block'>
                    <h1>Tableau de bord</h1>
                    <div className='dashboard_block'>
                        <div className="last_project">
                            <div className="header">
                                <h2>{lastProject.lastProject.pro_name}</h2>
                                <div className="see_project">
                                    <Link className='click_button' to={`/projects/${lastProject.lastProject.pro_id}`}>Voir mon projet</Link>
                                </div>
                            </div>
                            <div className="steps_block">
                                <h3>Étapes du projet</h3>
                                <div className="steps">
                                    {lastProject.states.map((state) => (
                                        <div className='step' key={state.sta_name}>
                                            <div className="step_color" style={getColor(state.pro_sta_states)}></div>
                                            <div className="step_text">{state.sta_name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='contact'>
                            <h2>Contact</h2>
                            <p>Une panne, une question, contactez le support technique de QOMIT par mail</p>
                            <a className='click_button' href='#'>Envoyer un mail</a>
                        </div>
                        <div className='last_documents'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
