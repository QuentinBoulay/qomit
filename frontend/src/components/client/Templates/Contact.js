function Contact() {
  return (
    <>
      <div className="contact-section-container">
        <div className="row">
          <div className="col-title align-items-center d-flex col-md col-12">
            <h2 className="font-size-32 title-white">
              Des questions techniques ou besoin d'assistance ? Cliquez ici pour
              nous envoyer un message rapidement. <br />
              <br />
              Les équipes de chez Qomit sont prêtes à vous fournir des réponses
              claires et efficaces pour vous accompagner dans votre projet.
            </h2>
          </div>
          <div className="col-contact-section col-md col-12 d-flex justify-content-center align-items-center">
            <a className="d-inline-block rounded-circle" href="/contact">
              <div className="contact-button d-flex flex-column justify-content-center align-items-center">
                <svg
                  width="86"
                  height="78"
                  viewBox="0 0 86 78"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M36.9094 78.0001V60.0803L47.3565 63.1969L36.9094 78.0001Z"
                    fill="#5959EB"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M86 0L69.6546 65.1266L37.9129 54.9684L66.2384 20.3056L29.6839 52.4852L0 43.1608L86 0Z"
                    fill="#5959EB"
                  />
                </svg>

                <h3 className="font-size-32 mt-3 text-center">
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
