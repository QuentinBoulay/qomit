import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../../../admin.scss';

import NavAdmin from '../../admin/Templates/NavAdmin';

import phoneIcon from "../../../img/admin/phone.svg";
import emailIcon from "../../../img/admin/email.svg";


import { API_BASE_URL, API_EP_USERS, API_EP_PROJECTS } from '../../../apiConstantes';


function ProjectDetails() {
    const activePage = "projects";

    const navigate = useNavigate();

    const [userId] = useState(localStorage.getItem('user_id_qomit'));

    const [project, setProject] = useState(null);


    let { id } = useParams();

    useEffect(() => {
        fetch(`${API_BASE_URL}${API_EP_USERS}/${userId}${API_EP_PROJECTS}/${id}`)
            .then(response => response.json())
            .then(project => {
                console.log(project);
                if (project.error === 1) {
                    navigate('/dashboard');
                } else {
                    setProject(project);
                }
            })
    }, [userId, id, navigate]);

    const getColorStep = (pro_sta_states) => {
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

    const getColorState = (pro_sta_states) => {
        switch (pro_sta_states) {
            case 1:
                return { backgroundColor: '#FBFBFB' };
            case 2:
                return { backgroundColor: '#ACAAFA' };
            case 3:
                return { backgroundColor: '#5955F4' };
            default:
                return {};
        }
    };

    if (!project) {
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

    return (
        <div className='body-admin'>
            <div className='page'>
                <div className='nav_admin'>
                    <NavAdmin activeLink={activePage} />
                </div>
                <div className='page_block'>
                    <h1>Suivi de projet</h1>
                    <div className='subtitle'>{project.pro_name}</div>
                    <div className='project_details'>
                        <div className="project_steps">
                            <div className="header">
                                <h2>Suivi détaillé de votre projet</h2>
                            </div>
                            <div className="steps_block">
                                <h3>Étapes du projet</h3>
                                <div className="steps">
                                    {project.states.map((state) => (
                                        <div className='step' key={state.sta_name}>
                                            <div className="step_color" style={getColorStep(state.pro_sta_states)}></div>
                                            <div className="step_text">{state.sta_name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='supervisor'>
                            <h2>Responsable de projet</h2>
                            <div className='block'>
                                <div>
                                    <div className='image'>
                                        <img src={project.responsable_picture} alt={project.responsable_firstname} />
                                    </div>
                                </div>
                                <div className='text'>
                                    {project.responsable_firstname} {project.responsable_lastname}
                                </div>
                            </div>
                            <div className='footer'>
                                <a className='click_button' href={`mailto:${project.responsable_email}`}>Envoyer un mail</a>
                            </div>
                        </div>
                        <div className='tasks'>
                            <h2>Liste des tâches</h2>
                            <div className='table_block'>
                                <div className='header'>
                                    <div className='title task_title'>
                                        Tâche
                                    </div>
                                    <div className='title contributor'>
                                        Intervenant
                                    </div>
                                    <div className='title time'>
                                        Durée
                                    </div>
                                    <div className='title state'>
                                        Statut
                                    </div>
                                </div>
                                <div className='table_body'>
                                    {project.tasks.map((state) => (
                                        <div className='task' key={state.tas_id}>
                                            <div className='title task_title'>
                                                {state.tas_nam_name}
                                            </div>
                                            <div className='title contributor'>
                                                {state.use_firstname} {state.use_lastname}
                                            </div>
                                            <div className='title time'>
                                                {state.tas_duration}h
                                            </div>
                                            <div className="title state">
                                                <div className={`block_state ${state.tas_sta_id === 1 ? 'active' : ''}`} style={getColorState(state.tas_sta_id)}>
                                                    {state.tas_sta_name}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='technical_sheet'>
                            <h2>Fiche technique</h2>
                            <div className='contact'>
                                <h3>Contact</h3>
                                <div className='name'>
                                    <div>
                                        <div className='image'>
                                            <img src={project.user_picture} alt={project.user_firstname} />
                                        </div>
                                    </div>
                                    <div className='text'>
                                        {project.user_firstname} {project.user_lastname}
                                    </div>
                                </div>
                                <div className='email'>
                                    <div className='image'>
                                        <img src={emailIcon} alt='icone email' />
                                    </div>
                                    <div className='text'>
                                        {project.user_email || "Non renseigné"}
                                    </div>
                                </div>
                                <div className='phone'>
                                    <div className='image'>
                                        <img src={phoneIcon} alt='icone téléphone' />
                                    </div>
                                    <div className='text'>
                                        {project.user_phone || "Non renseigné"}
                                    </div>
                                </div>
                            </div>
                            <div className='urls'>
                                <div className='prod'>
                                    <h3>URL</h3>
                                    <a href={project.pro_link_prod || "#"} target='_blank' rel="noreferrer">{project.pro_link_prod || "Non renseigné"}</a>
                                </div>
                                <div className='dev'>
                                    <h3>URL de développement</h3>
                                    <a href={project.pro_link_dev || "#"} target='_blank' rel="noreferrer">{project.pro_link_dev || "Non renseigné"}</a>
                                </div>
                            </div>
                            <div className='date'>
                                <div className='start'>
                                    <h3>Date de début</h3>
                                    <div className='text'>
                                        {project.pro_date_start || "Non renseigné"}
                                    </div>
                                </div>
                                <div className='online'>
                                    <h3>Date de mise en ligne</h3>
                                    <div className='text'>
                                        {project.pro_date_online || "Non renseigné"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;
