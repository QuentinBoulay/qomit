import NavDark from "../Templates/NavDark"
import Contact from "../Templates/Contact.js";
import Footer from "../Templates/Footer.js";
import emailjs from "emailjs-com";
import { useState } from "react";
import HeroContact from "./HeroContact";

function ContactComp() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  function sendEmail(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const idea = e.target.idea.value;
    const desc = e.target.desc.value;
    const termsAccepted = e.target.terms.checked;

    if (!name) {
      setNotificationType("error");
      setNotificationMessage("Veuillez saisir votre nom");
      setShowNotification(true);
      return;
    }

    if (!idea) {
      setNotificationType("error");
      setNotificationMessage("Veuillez sélectionner une option");
      setShowNotification(true);
      return;
    }

    if (!desc) {
      setNotificationType("error");
      setNotificationMessage("Veuillez saisir une description");
      setShowNotification(true);
      return;
    }

    if (!termsAccepted) {
      setNotificationType("error");
      setNotificationMessage("Vous devez accepter les termes et conditions");
      setShowNotification(true);
      return;
    }

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    emailjs
      .sendForm(
        "service_1l2k4em",
        "template_0z3ji2r",
        e.target,
        "PBYjwhKsEDh-MDmU9"
      )
      .then(
        (result) => {
          console.log(result.text);
          setNotificationType("success");
          setNotificationMessage("Votre message a été envoyé avec succès");
          setShowNotification(true);
        },
        (error) => {
          console.log(error.text);
          setNotificationType("error");
          setNotificationMessage(
            "Une erreur s'est produite, veuillez réessayer"
          );
          setShowNotification(true);
        }
      );
  }

  function handleNotificationClose() {
    setShowNotification(false);
  }

  return (
    <>
      <div className="body-contact">
        <NavDark />
        <HeroContact />
        {showNotification && (
          <div className={`notification ${notificationType}`}>
            <p>{notificationMessage}</p>
            <button
              className="notification-close"
              onClick={handleNotificationClose}
            >
              <span>&times;</span>
            </button>
          </div>
        )}
        <div className="form-container">
          <form onSubmit={sendEmail}>
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
                <input
                  type="checkbox"
                  name="terms"
                  className="checkbox-input"
                />
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
          </form>
        </div>
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default ContactComp;
