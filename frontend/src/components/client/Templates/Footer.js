import logo from "../../../img/logo-blanc.png";
import { NavLink } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="container-footer-section">
      <div className="row">
        <div className="col-footer-section-logo col-12 col-md-6 col-lg-3">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="img-footer-section mb-3" />
          </NavLink>
          <p>Mentions légales - © {currentYear} QOMIT</p>
        </div>
        <div className="col-footer-section col-6 col-md-3 col-lg-2">
          <ul className="list-unstyled">
            <li>
              <NavLink activeClassName="current-page" to="/">
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="current-page" to="/services">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="current-page" to="/agence">
                L'agence
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-footer-section col-6 col-md-3 col-lg-2">
          <ul className="list-unstyled">
            <li>
              <NavLink exact activeClassName="current-page" to="/devis">
                Devis
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="current-page" to="/contact">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="current-page" to="/">
                Espace client
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
