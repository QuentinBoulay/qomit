import img from "../../../img/message.svg";

function Contact() {
  return (
    <>
      <div className="contact-section-container">
        <div className="row">
          <div className="col-title align-items-center d-flex col-md col-12">
            <h2 className="font-size-48 title-white">
              Lorem Vestibulum facilisis, justo eu sodales tincidunt.
            </h2>
          </div>
          <div className="col-contact-section col-md col-12 d-flex justify-content-center align-items-center">
            <a className="d-inline-block rounded-circle" href="#">
              <div className="contact-button d-flex flex-column justify-content-center align-items-center">
                <img src={img} alt="icone message"></img>
                <h3 className="font-size-32 mt-5 text-center">
                  Envoyer un message
                </h3>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
