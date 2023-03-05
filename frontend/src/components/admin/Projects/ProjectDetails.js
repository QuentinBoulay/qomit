import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../../../admin.scss';

import NavAdmin from '../../admin/Templates/NavAdmin';

import { API_BASE_URL, API_EP_USERS, API_EP_TOKEN } from '../../../apiConstantes';


function ProjectDetails() {
    const activePage = "projects";

    const navigate = useNavigate();

    const [userToken, setUserToken] = useState(localStorage.getItem('user_token_qomit'));
    const [checkToken, setcheckToken] = useState(null);

    const [lastProject, setlastProject] = useState(null);

    let { id } = useParams();
    console.log(id);

    return (
        <div className='body-admin'>
            <div className='page'>
                <div className='nav_admin'>
                    <NavAdmin activeLink={activePage} />
                </div>
                <div className='page_block'>
                    <h1>Mon projet en détail</h1>
                    <p>Détails du projet {id}</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;
