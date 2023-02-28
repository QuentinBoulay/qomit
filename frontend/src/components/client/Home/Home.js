import Nav from "../Templates/Nav.js";
import Hero from "./Hero.js";
import Services from "./Services.js";
import Ticker from "./Ticker.js";

function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Ticker />
      <div className="devis-container position-relative">
        <h2 className="w-50 mb-5">
          Lorem ipsum dolor sit amet. Etiam efficitur ipsum, a vehicula porta.
          Ut vitae egestas ante.
        </h2>
        <button className="purple-button d-flex align-items-center">
          Demande de devis
          <box-icon name="right-arrow-alt" color="#ffffff"></box-icon>
        </button>
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
    </>
  );
}

export default Home;
