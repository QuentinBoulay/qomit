import Nav from "../Templates/Nav.js";
import Hero from "./Hero.js";
import Services from "./Services.js";
import Ticker from "./Ticker.js";
import Devis from "./Devis.js";
import Cases from "./Cases.js";
import Companies from "./Companies/Companies.js";

function Home() {
  return (
    <div className="body-home">
      <Nav />
      <Hero />
      <Services />
      <Ticker />
      <Devis />
      <Cases />
      <Companies />
    </div>
  );
}

export default Home;
