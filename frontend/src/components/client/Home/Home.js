import Nav from "../Templates/Nav.js";
import Hero from "./Hero.js";
import Services from "./Services.js";
import Ticker from "./Ticker.js";
import Devis from "./Devis.js";
import logo from "../../../img/use-case.png";

function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Ticker />
      <Devis />
      <div className="nos-realisations-container">
        <div className="row">
          <div className="col-title align-items-center d-flex col-12 col-lg-6 col-sm-12 col-xs-12">
            <h2 className="font-size-55">Nos<br></br> réalisations</h2>
          </div>
          <div className="col-use-case col-12 col-lg-6 col-sm-12 col-xs-12">
          <img src={logo} alt='Use case'></img>
            <h3 className="font-size-38 my-5">Lorem ipsum dolor sit amet rae</h3>
            <p>Vestibulum vitae nisl non nibh pretium faucibus. Vestibulum facilisis, justo eu sodales tincidunt.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
