import logo from "../../../img/logo-blanc.png";

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
    <footer className="container-footer-section">
        <div className="row">
            <div className="col-footer-section-logo col-12 col-md-6 col-lg-3">
                <img src={logo} alt="Logo" className="img-footer-section mb-3" />
                <p>Mentions légales - © {currentYear} QOMIT</p>
            </div>
            <div className="col-footer-section col-6 col-md-3 col-lg-2">
                <ul className="list-unstyled">
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">L'agence</a></li>
                </ul>
            </div>
            <div className="col-footer-section col-6 col-md-3 col-lg-2">
                <ul className="list-unstyled">
                    <li><a href="#">Devis</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Espace client</a></li>
                </ul>
            </div>
            <div className="col-12 col-md-12 col-lg-5"></div>
        </div>
    </footer>
    );
}

export default Footer;