import img from "../../../img/message.svg";

function Contact() {
  return (
    <>
      <div className="contact-section-container">
        <div className="row">
          <div className="col-title align-items-center d-flex col-12 col-lg-6 col-sm-12 col-xs-12">
            <h2 className="font-size-48 title-white">
              Lorem Vestibulum facilisis, justo eu sodales tincidunt.
            </h2>
          </div>
          <div className="col-contact-section col-12 col-lg-6 col-sm-12 col-xs-12">
            <img src={img} alt="icone message"></img>
            <a href="#">
                <h3 className="font-size-32 my-5">
                Envoyer un message
                </h3>
            </a>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
