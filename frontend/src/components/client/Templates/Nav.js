import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
    <>
      <nav>
        <div className="row py-4 px-5 align-items-center">
          <div className="logo-container p-0 d-flex justify-content-start col-12 col-lg-3 col-md-6 col-sm-6">
            <NavLink to="/">
              <img src={logo} alt="logo QOMIT"></img>
            </NavLink>
          </div>
          <div className="menu-container p-0 col-12 col-lg-6 col-md-6 d-none d-lg-block">
            <ul className="list-unstyled d-flex justify-content-center">
              <div className="d-flex">
                <NavLink exact activeClassName="active" to="/">
                  <li className="font-size-14">Accueil</li>
                </NavLink>
                <NavLink activeClassName="active" to="/admin/posts">
                  <li className="font-size-14">Services</li>
                </NavLink>
                <NavLink activeClassName="active" to="/agence">
                  <li className="font-size-14">L'agence</li>
                </NavLink>
                <NavLink activeClassName="active" to="/admin/posts">
                  <li className="font-size-14">Devis</li>
                </NavLink>
              </div>
            </ul>
          </div>
          <div
            className="mobile-nav-button d-md-block d-sm-block d-xs-block d-lg-none"
            onClick={handleClick}
          >
            <div
              className={`mobile-nav-button__line ${
                isActive ? "mobile-nav-button__line--1 line_white" : ""
              }`}
            ></div>
            <div
              className={`mobile-nav-button__line ${
                isActive ? "mobile-nav-button__line--2 line_white" : ""
              }`}
            ></div>
            <div
              className={`mobile-nav-button__line ${
                isActive ? "mobile-nav-button__line--3 line_white" : ""
              }`}
            ></div>
          </div>

          <nav
            className={`mobile-menu ${
              isActive
                ? "mobile-menu--open d-md-block d-sm-block d-xs-block"
                : ""
            }`}
          >
            <ul className="list-unstyled">
              <li className="font-size-48 active">
                <NavLink className="d-inline-block active" to="/">
                  Accueil
                </NavLink>
              </li>
              <li className="font-size-48">
                <NavLink className="d-inline-block" to="/admin/posts">
                  Services
                </NavLink>
              </li>
              <li className="font-size-48">
                <NavLink className="d-inline-block" to="/agence">
                  L'agence
                </NavLink>
              </li>
              <li className="font-size-48">
                <NavLink className="d-inline-block" to="/admin/posts">
                  Devis
                </NavLink>
              </li>

              <li className="mt-5 font-size-48">
                <NavLink className="d-inline-block" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="mt-5 text-center font-size-28">
                <div className="client-place-burger d-inline-block">
                  <NavLink to="/admin">Espace client</NavLink>
                </div>
              </li>
            </ul>
          </nav>
          <div className="contact-container p-0 d-flex justify-content-end align-items-center col-12 col-lg-3">
            <NavLink className="d-none d-lg-block font-size-14" to="/contact">
              Contact
            </NavLink>
            <NavLink className="font-size-14" to="/admin">
              <li className="d-none d-lg-block ml-4 client-place button">
                Espace client
              </li>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
