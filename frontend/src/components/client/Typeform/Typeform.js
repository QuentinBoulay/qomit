import Nav from "../Templates/Nav.js";
import Contact from "../Templates/Contact.js";
import Footer from "../Templates/Footer.js";
import HelpForm from "../HelpForm.js";
import nadir from "../../../img/nadir.png";

function Typeform() {
  return (
    <div className="body-home">
      <Nav />
      <div className="typeform-container">
        <div className="row">
          <div className="col-12 col-md-5 text-center d-flex flex-column justify-content-center align-items-center">
            {" "}
            <img className="mb-4" src={nadir} alt="Photo de profil" />
            <h2 className="font-size-20">Nadir, notre CEO</h2>
          </div>
          <div className="col col-md-7">
            {" "}
            <HelpForm />
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default Typeform;
