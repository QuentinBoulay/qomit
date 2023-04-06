import Contact from "../Templates/Contact.js";
import Footer from "../Templates/Footer.js";
import Nav from "../Templates/NavDark.js";
import HeroDark from "./HeroDark.js";
import ProjectIdea from "./ProjectIdea.js";


function Estimate() {
  return (
    <div className="body-estimate">
      <Nav />
      <HeroDark />
      <ProjectIdea />
      <Contact />
      <Footer />
    </div>
  );
}

export default Estimate;
