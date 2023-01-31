import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../img/logo.png";

function Nav ()  {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(prevState => !prevState);
  };

  return (
    <div className='container-fluid'>
        <nav>
          <div className='row py-4 px-5 align-items-center'>
            <div className='logo-container p-0 d-flex justify-content-start col-12 col-lg-3 col-md-1 col-sm-1'>
              <Link to="/">
                <img className='w-50' src={logo} alt='logo QOMIT'></img>
              </Link>
            </div>
            <div className='menu-container p-0 col-12 col-lg-6 col-md-8 d-none d-md-block'>
                <ul className='list-unstyled d-flex justify-content-center'>
                  <div className='d-flex'>
                    <li className='mr-1 font-size-18 active'>
                      <Link className='active' to="/admin/posts">Accueil</Link>
                    </li>
                    <li className='mr-1 font-size-18'>
                      <Link to="/admin/posts">Services</Link>
                    </li>
                    <li className='mr-1 font-size-18'>
                      <Link to="/admin/posts">L'agence</Link>
                    </li>
                    <li className='font-size-18'>
                      <Link to="/admin/posts">Devis</Link>
                    </li>
                  </div>
                </ul>
              </div>
              <div className="mobile-nav-button d-block d-sm-none" onClick={handleClick}>
                <div className={`mobile-nav-button__line ${isActive ? 'mobile-nav-button__line--1 line_white' : ''}`}></div>
                <div className={`mobile-nav-button__line ${isActive ? 'mobile-nav-button__line--2 line_white' : ''}`}></div>
                <div className={`mobile-nav-button__line ${isActive ? 'mobile-nav-button__line--3 line_white' : ''}`}></div>
              </div>

              <nav className={`mobile-menu ${isActive ? 'mobile-menu--open d-block d-sm-none' : ''}`}>
                <ul className='list-unstyled'>
                  <li className='mr-1 font-size-48 active'>
                    <Link className='active' to="/admin/posts">Accueil</Link>
                  </li>
                  <li className='mr-1 font-size-48'>
                    <Link to="/admin/posts">Services</Link>
                  </li>
                  <li className='mr-1 font-size-48'>
                    <Link to="/admin/posts">L'agence</Link>
                  </li>
                  <li className='font-size-48'>
                    <Link to="/admin/posts">Devis</Link>
                  </li>

                  <li className='mt-5 font-size-48'>
                  <Link to="/admin/posts">Contact</Link>
                  </li>
                  <li className='mt-5 text-center font-size-28'>
                    <div className='client-place-burger d-inline-block'><Link to="/admin/posts">Espace client</Link></div>
                  </li>
                </ul>
              </nav>
              <div className='contact-container p-0 d-flex justify-content-end align-items-center col-12 col-lg-3 col-md-3'>
                <Link className='d-none d-sm-block font-size-18' to="/admin/posts">Contact</Link>
                <div className='d-none d-sm-block ml-4 client-place button'>
                  <Link className='font-size-18' to="/admin/posts">Espace client</Link>
                </div>
              </div>
            </div>
        </nav>
  </div>
  );

};

export default Nav;