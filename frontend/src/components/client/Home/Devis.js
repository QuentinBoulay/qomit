function Devis() {
  return (
    <>
      <div className="devis-container position-relative">
        <div className="row">
          <div className="col-12 col-lg-6 col-sm-12 col-xs-12">
            <h2 className="mb-5">
              Découvrez notre section devis pour un accompagnement sur-mesure.
              <br />
              <br />
              Que votre projet soit bien défini ou en cours de réflexion, nos
              formulaires adaptés vous guident pour finaliser et concrétiser vos
              idées.
            </h2>
            <a href="/devis">
              <button className="purple-button d-flex align-items-center">
                Demande de devis
                <box-icon name="right-arrow-alt" color="#ffffff"></box-icon>
              </button>
            </a>
          </div>
          <lottie-player
            src="https://lottie.host/2701362e-b03e-41fd-961c-b5277dbc789b/aCvD8DkmxL.json"
            background="transparent"
            speed="1"
            style={{
              width: "400px",
              height: "400px",
              position: "absolute",
              bottom: "-42px",
              right: "100px",
            }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </>
  );
}

export default Devis;
