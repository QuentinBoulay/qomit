import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/logo.png";

function Nav() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "visible";
  }, [isActive]);

  const handleClick = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <div className="container-fluid">
      <nav>
        <div className="row py-4 px-5 align-items-center">
          <div className="logo-container p-0 d-flex justify-content-start col-12 col-lg-3 col-md-6 col-sm-6">
            <Link to="/">
              <img src={logo} alt="logo QOMIT"></img>
            </Link>
          </div>
          <div className="menu-container p-0 col-12 col-lg-6 col-md-6 d-none d-lg-block">
            <ul className="list-unstyled d-flex justify-content-center">
              <div className="d-flex">
                <Link className="active" to="/admin/posts">
                  <li className="mr-1 font-size-14">Accueil</li>
                </Link>
                <Link to="/admin/posts">
                  <li className="mr-1 font-size-14">Services</li>
                </Link>
                <Link to="/admin/posts">
                  <li className="mr-1 font-size-14">L'agence</li>
                </Link>
                <Link to="/admin/posts">
                  <li className="font-size-14">Devis</li>
                </Link>
              </div>
            </ul>
          </div>
          <div
            className="mobile-nav-button d-md-block d-sm-block d-xs-block d-lg-none"
            onClick={handleClick}
          >
            <div
              className={`mobile-nav-button__line ${isActive ? "mobile-nav-button__line--1 line_white" : ""
                }`}
            ></div>
            <div
              className={`mobile-nav-button__line ${isActive ? "mobile-nav-button__line--2 line_white" : ""
                }`}
            ></div>
            <div
              className={`mobile-nav-button__line ${isActive ? "mobile-nav-button__line--3 line_white" : ""
                }`}
            ></div>
          </div>

          <nav
            className={`mobile-menu ${isActive
              ? "mobile-menu--open d-md-block d-sm-block d-xs-block"
              : ""
              }`}
          >
            <ul className="list-unstyled">
              <li className="mr-1 font-size-48 active">
                <Link className="d-inline-block active" to="/admin/posts">
                  Accueil
                </Link>
              </li>
              <li className="mr-1 font-size-48">
                <Link className="d-inline-block" to="/admin/posts">
                  Services
                </Link>
              </li>
              <li className="mr-1 font-size-48">
                <Link className="d-inline-block" to="/admin/posts">
                  L'agence
                </Link>
              </li>
              <li className="font-size-48">
                <Link className="d-inline-block" to="/admin/posts">
                  Devis
                </Link>
              </li>

              <li className="mt-5 font-size-48">
                <Link className="d-inline-block" to="/admin/posts">
                  Contact
                </Link>
              </li>
              <li className="mt-5 text-center font-size-28">
                <div className="client-place-burger d-inline-block">
                  <Link to="/admin">Espace client</Link>
                </div>
              </li>
            </ul>
          </nav>
          <div className="contact-container p-0 d-flex justify-content-end align-items-center col-12 col-lg-3">
            <Link className="d-none d-lg-block font-size-14" to="/admin/posts">
              Contact
            </Link>
            <Link className="font-size-14" to="/admin">
              <li className="d-none d-lg-block ml-4 client-place button">
                Espace client
              </li>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
