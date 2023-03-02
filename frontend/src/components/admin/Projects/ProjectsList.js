import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../../admin.scss';

import NavAdmin from '../../admin/Templates/NavAdmin';


//import { API_BASE_URL, API_EP_LOGIN } from '../../apiConstantes';

function ProjectsList() {
    const activePage = "projectsList";

    return (
        <div className='body-admin'>
            <div className='page'>
                <div className='nav_admin'>
                    <NavAdmin activeLink={activePage} />
                </div>
                <div className='page_block'>
                    <h1>Suivi de projet</h1>
                </div>
            </div>
        </div>
    );
}

export default ProjectsList;
