import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../../../admin.scss';

import NavAdmin from '../../admin/Templates/NavAdmin';

function ProjectDetails() {
    const activePage = "projects";

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
