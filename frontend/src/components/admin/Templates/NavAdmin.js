import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


import logo from "../../../img/logo.png";
import logoSmall from "../../../img/logo_small.svg";
import BurgerIcon from '../../../img/admin/burger.svg';
import LogoutIcon from '../../../img/admin/logout.svg';

import DashboardActiveIcon from '../../../img/admin/dashboard_grey.svg';
import ProjectActiveIcon from '../../../img/admin/project_grey.svg';
import DocumentsActiveIcon from '../../../img/admin/documents_grey.svg';
import ProfileActiveIcon from '../../../img/admin/profile_grey.svg';

import DashboardIcon from '../../../img/admin/dashboard_white.svg';
import ProjectIcon from '../../../img/admin/project_white.svg';
import DocumentsIcon from '../../../img/admin/documents_white.svg';
import ProfileIcon from '../../../img/admin/profile_white.svg';

import { API_BASE_URL, API_EP_USERS } from '../../../apiConstantes';

function NavAdmin(props) {

    const [activeLink, setActiveLink] = React.useState(props.activeLink);
    const [isMenuOpen, setisMenuOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [userToken, setUserToken] = useState(localStorage.getItem('user_token_qomit'));
    const [userId, setUserId] = useState(localStorage.getItem('user_id_qomit'));
    const [userData, setUserData] = useState({ use_picture: '', use_firstname: '', use_lastname: '' });


    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.isMenuOpen === undefined) {
            setisMenuOpen(true);
            handleBurger(true);
        } else {
            setisMenuOpen(location.state?.isMenuOpen);
            handleBurger(location.state?.isMenuOpen);
        }

    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 991);
            if (window.innerWidth <= 991) {
                setisMenuOpen(false);
                handleBurger(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}${API_EP_USERS}/${userId}`);
                const data = await response.json();
                setUserData({ use_picture: data.use_picture, use_firstname: data.use_firstname, use_lastname: data.use_lastname });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [userId]);

    const handleClick = (link, menuOpen) => {
        if (link === 'dashboard') {
            navigate('/dashboard', { state: { isMenuOpen: menuOpen } });
        } else if (link === 'projects') {
            navigate('/projects', { state: { isMenuOpen: menuOpen } });
        }
        else if (link === 'documents') {
            navigate('/documents', { state: { isMenuOpen: menuOpen } });
        }
        else if (link === 'profile') {
            navigate('/profile', { state: { isMenuOpen: menuOpen } });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user_token_qomit');
        localStorage.removeItem('user_id_qomit');
        setUserToken(null);
        setUserId(null);
        navigate('/admin');
    }

    const handleBurger = (menu) => {
        console.log(menu);
        if (menu === true) {
            const blockPage = document.querySelector('.page_block');
            blockPage.style.marginLeft = "390px";
        } else if (menu === false) {
            const blockPage = document.querySelector('.page_block');
            blockPage.style.marginLeft = "156px";
        }

    }

    useEffect(() => {
        setTimeout(() => {
            const pageBlock = document.querySelector('.page');
            pageBlock.style.display = 'flex';
        }, 10);
    }, []);


    return (
        <div className={`menu_admin ${isMenuOpen ? "" : "menu_close"} ${isSmallScreen ? "small_screen" : ""}`}>
            <div className='block'>
                <div className="burger" onClick={() => { !isSmallScreen && setisMenuOpen(!isMenuOpen); if (!isSmallScreen) { handleBurger(!isMenuOpen) } }}>
                    <img src={BurgerIcon} alt="Bouton burger" />
                </div>
                <div className={`logo ${isMenuOpen ? "" : "small_logo"}`}>
                    <img src={isMenuOpen ? logo : logoSmall} alt="Logo QOMIT" />
                </div>



                <div className="block_links">
                    <div
                        className={`link ${activeLink === "dashboard" ? "active" : ""} ${isMenuOpen ? "" : "hide_text"}`}
                        onClick={() => handleClick("dashboard", isMenuOpen)}
                    >
                        <div className="icon">
                            <img src={activeLink === "dashboard" ? DashboardIcon : DashboardActiveIcon} alt="icone du tableau de bord" />
                        </div>
                        <div className="text">Tableau de bord</div>
                    </div>
                    <div
                        className={`link ${activeLink === "projects" ? "active" : ""} ${isMenuOpen ? "" : "hide_text"}`}
                        onClick={() => handleClick("projects", isMenuOpen)}
                    >
                        <div className="icon">
                            <img src={activeLink === "projects" ? ProjectIcon : ProjectActiveIcon} alt="icone du suivi de projet" />
                        </div>
                        <div className="text">Suivi de projet</div>
                    </div>
                    <div
                        className={`link ${activeLink === "documents" ? "active" : ""} ${isMenuOpen ? "" : "hide_text"}`}
                        onClick={() => handleClick("documents", isMenuOpen)}
                    >
                        <div className="icon">
                            <img src={activeLink === "documents" ? DocumentsIcon : DocumentsActiveIcon} alt="icone des documents" />
                        </div>
                        <div className="text">Mes documents</div>
                    </div>
                    <div
                        className={`link ${activeLink === "profile" ? "active" : ""} ${isMenuOpen ? "" : "hide_text"}`}
                        onClick={() => handleClick("profile", isMenuOpen)}
                    >
                        <div className="icon">
                            <img src={activeLink === "profile" ? ProfileIcon : ProfileActiveIcon} alt="icone du profil" />
                        </div>
                        <div className="text">Mon profil</div>
                    </div>
                </div>
            </div>
            <div className='nav_footer'>
                <div className={`user_info ${isMenuOpen ? "" : "hide_text"}`}>
                    <div className='image'>
                        <img src={userData.use_picture} alt={userData.use_firstname} />
                    </div>
                    <div className='text'>
                        {userData.use_firstname} {userData.use_lastname}
                    </div>
                </div>
                <div
                    className={`link ${isMenuOpen ? "" : "hide_text"}`}
                    onClick={() => handleLogout()}
                >
                    <div className="icon">
                        <img src={LogoutIcon} alt="icone de déconnexion" />
                    </div>
                    <div className="text">Déconnexion</div>
                </div>
            </div>

        </div>
    );
}

export default NavAdmin;
