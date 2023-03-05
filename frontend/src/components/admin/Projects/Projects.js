import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../../../admin.scss';

import NavAdmin from '../Templates/NavAdmin';

import eyeIcon from "../../../img/admin/documents/eye.svg";

import { API_BASE_URL, API_EP_USERS, API_EP_PROJECTS } from '../../../apiConstantes';

function Projects() {
    const activePage = "projects";

    const [userId, setUserId] = useState(localStorage.getItem('user_id_qomit'));

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}${API_EP_USERS}/${userId}${API_EP_PROJECTS}`)
            .then((response) => response.json())
            .then((projects) => setProjects(projects));
    }, [userId]);

    return (
        <div className='body-admin'>
            <div className='page'>
                <div className='nav_admin'>
                    <NavAdmin activeLink={activePage} />
                </div>
                <div className='page_block'>
                    <h1>Suivi de projet</h1>
                    <div className='subtitle'>Choisissez le projet à consulter</div>

                    <div className='projects_follow_block' >
                        {projects.map((project) => (
                            <div className='project_follow' key={project.pro_id}>
                                <div className='header'>
                                    <h2>{project.pro_name}</h2>
                                    <div>
                                        <Link className='see' to={`/projects/${project.pro_id}`}>
                                            <img src={eyeIcon} alt='icone voir projet' />
                                        </Link>
                                    </div>
                                </div>
                                <div className='infos'>
                                    <div className='supervisor'>
                                        <h3>Responsable</h3>
                                        <div className='block'>
                                            <div className='image'>
                                                <img src={project.use_picture} alt={project.use_firstname} />
                                            </div>
                                            <div className='text'>
                                                {project.use_firstname} {project.use_lastname}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='state_date'>
                                        <div className='state_block'>
                                            <h3>Statut</h3>
                                            <div className='state' style={{ backgroundColor: project.project_states === 'En cours' ? '#ACAAFA' : '#5955F4' }}>
                                                {project.project_states}
                                            </div>
                                        </div>
                                        <div className='date_block'>
                                            <h3>Date de début</h3>
                                            <div className='date'>{project.pro_date_start}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
