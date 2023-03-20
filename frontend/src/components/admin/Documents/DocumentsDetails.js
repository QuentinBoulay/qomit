import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../../../admin.scss';

import NavAdmin from '../../admin/Templates/NavAdmin';

import arrowIcon from "../../../img/admin/documents/arrow_purple.svg";

import { API_BASE_URL, API_EP_USERS, API_EP_PROJECTS, API_EP_DOCUMENTS } from '../../../apiConstantes';


function DocumentsDetails() {
    const activePage = "documents";

    const navigate = useNavigate();

    const [userId] = useState(localStorage.getItem('user_id_qomit'));

    const [project, setProject] = useState(null);

    const [selectedFilter, setSelectedFilter] = useState("Tout");

    const [filteredDocuments, setFilteredDocuments] = useState([]);


    let { id } = useParams();

    useEffect(() => {
        fetch(`${API_BASE_URL}${API_EP_USERS}/${userId}${API_EP_PROJECTS}/${id}${API_EP_DOCUMENTS}`)
            .then(response => response.json())
            .then(project => {
                if (project.error === 1) {
                    navigate('/dashboard');
                } else {
                    setProject(project);
                    setFilteredDocuments(project.data.find(item => item.doc_typ_name === selectedFilter).documents);
                }
            })
    }, [userId, id, navigate, selectedFilter]);

    const handleFilterClick = (filterName) => {
        setSelectedFilter(filterName);
    }

    if (!project) {
        return (
            <div className='body-admin'>
                <div className='page'>
                    <div className='nav_admin'>
                        <NavAdmin activeLink={activePage} />
                    </div>
                    <div className='page_block'>
                        <h1>Mes documents</h1>
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
                    <h1>Mes documents</h1>
                    <div className='subtitle'>{project.pro_name}</div>
                    <div className='documents_details'>
                        <div className='documents_list'>
                            <div className='filters'>
                                {project.data.map(filter => (
                                    <div className={`filter ${filter.doc_typ_name === selectedFilter ? 'active' : ''}`} onClick={() => handleFilterClick(filter.doc_typ_name)}>
                                        {filter.doc_typ_name}
                                    </div>
                                ))}
                            </div>
                            <div className='table_block'>
                                <div className='header'>
                                    <div className='title name'>
                                        Nom
                                    </div>
                                    <div className='title type'>
                                        Type
                                    </div>
                                    <div className='title date'>
                                        Date
                                    </div>
                                    <div className='title link'>
                                        Consulter
                                    </div>
                                </div>
                                <div className='table_body'>
                                    {filteredDocuments.map((document) => (
                                        <div className='task' key={document.doc_id}>
                                            <div className='title name'>
                                                {document.doc_name}
                                            </div>
                                            <div className='title type'>
                                                {document.doc_typ_name}
                                            </div>
                                            <div className='title date'>
                                                {document.doc_create_date}
                                            </div>
                                            <div className="title link">
                                                <a href={document.doc_link} target="_blank" rel="noopener noreferrer"><img src={arrowIcon} alt='icone fleche' /></a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentsDetails;
