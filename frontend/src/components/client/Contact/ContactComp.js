import Contact from "../Templates/Contact.js";
import Footer from "../Templates/Footer.js";

function ContactComp() {
  return (
    <>
      <div className="form-container">
        <div className="form">
          <div className="row">
            <p className="col-xs-12 mb-3 font-size-32">Hey, mon nom est </p>
            <input
              type="text"
              name="name"
              className="col-xs-12 mb-3 first-input"
            />
            <p className="col-xs-12 mb-3 font-size-32">
              et j'ai une idée de projet pour
            </p>
          </div>
          <div className="row">
            <select name="idea" id="idea" className="col-xs-12 mb-3">
              <option value="">Choisissez une option</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
            <p className="font-size-32 mb-3 col-xs-12 ">et j'aimerai que :</p>
          </div>
          <div className="row">
            <input type="text" name="desc" className="desc-input" />
          </div>
          <div className="row">
            <label className="checkbox-label">
              <input type="checkbox" name="terms" className="checkbox-input" />
              <span className="checkbox-text font-size-24">
                J'accepte tous les termes et conditions
              </span>
            </label>
          </div>
          <div className="row">
            <button className="purple-button col-xs-12 d-flex justify-content-between">
              Envoyer
              <box-icon name="right-arrow-alt" color="#ffffff"></box-icon>
            </button>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </>
  );
}

export default ContactComp;
