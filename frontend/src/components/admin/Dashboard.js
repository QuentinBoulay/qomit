import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../../admin.scss';

import NavAdmin from '../admin/Templates/NavAdmin';

import eyeIcon from "../../img/admin/documents/eye.svg";
import arrowIcon from "../../img/admin/documents/arrow.svg";

import documentIcon from "../../img/admin/documents/doc.svg";
import euroIcon from "../../img/admin/documents/euro.svg";
import screenIcon from "../../img/admin/documents/screen.svg";

import { API_BASE_URL, API_EP_USERS, API_EP_LAST_PROJECT, API_EP_LAST_DOCUMENTS } from '../../apiConstantes';

function Dashboard() {
    const activePage = "dashboard";

    const navigate = useNavigate();

    const [userToken] = useState(localStorage.getItem('user_token_qomit'));
    const [userId] = useState(localStorage.getItem('user_id_qomit'));

    const [lastProject, setlastProject] = useState(null);
    const [lastDocuments, setlastDocuments] = useState(null);


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

    useEffect(() => {
        fetch(`${API_BASE_URL}${API_EP_USERS}/${userId}${API_EP_LAST_DOCUMENTS}`)
            .then((response) => response.json())
            .then((lastDocuments) => setlastDocuments(lastDocuments));
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

    const getDocIcon = (doc_typ_image) => {
        switch (doc_typ_image) {
            case "1":
                return euroIcon;
            case "2":
                return screenIcon;
            case "3":
                return documentIcon;
            default:
                return "";
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
    if (!lastDocuments) {
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
                            <div className='header'>
                                <h2>Contact</h2>
                                <p>Une panne, une question, contactez le support technique de QOMIT par mail</p>
                            </div>
                            <div className='footer'>
                                <a className='click_button' href='mailto:n.oubah@qomit.fr'>Envoyer un mail</a>
                            </div>
                        </div>
                        <div className='last_documents'>
                            <h2>Mes derniers documents</h2>
                            <div className='projects'>
                                {lastDocuments.projects.map(project => (
                                    <div key={project.project.pro_id} className='project_doc_block'>
                                        <div className='header'>
                                            <h3>{project.project.pro_name}</h3>
                                            <div>
                                                <Link className='see' to={`/documents/${project.project.pro_id}`}><img src={eyeIcon} alt='icone voir documents du projet' /></Link>
                                            </div>
                                        </div>
                                        <div className='documents'>
                                            {project.documents.map(document => (
                                                <div key={document.doc_id} className='document'>
                                                    <div className='type'>
                                                        <div className='image'>
                                                            <img src={getDocIcon(document.doc_typ_image)} alt={document.doc_typ_name} />
                                                        </div>
                                                        <div className='text'>
                                                            <div className='type'>{document.doc_typ_name}</div>
                                                            <div className='name'>{document.doc_name}</div>
                                                        </div>
                                                    </div>
                                                    <div className='date'>{document.doc_create_date}</div>
                                                    <div className='link'>
                                                        <a href={document.doc_link} target="_blank" rel="noopener noreferrer"><img src={arrowIcon} alt='icone fleche' /></a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
