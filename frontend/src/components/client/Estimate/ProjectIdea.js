import React from 'react';
import img1 from "../../../img/idea.svg";
import img2 from "../../../img/callcenter.svg";


const ProjectIdea = () => {
  return (
    <div className="project-idea-container container-fluid">
      <div className="row project-idea-row justify-content-between">
        <div className="project-idea-col-1 d-flex flex-column justify-content-between align-items-center">
          <h2 className="my-2 project-idea-title">J’ai mon idée, je veux connaitre les solutions !</h2>
          <img src={img1} alt="Votre icône" className="my-2 project-idea-icon" />
          <a className="project-idea-button-1" href="/contact">Découvrir</a>
        </div>
        <div className="project-idea-col-2 d-flex flex-column justify-content-between align-items-center">
          <h2 className="my-2 project-idea-title">Besoin d’un accompagnement ?</h2>
          <img src={img2} alt="Votre icône" className="my-2 project-idea-icon" />
          <a className="project-idea-button-2" href="/devis/typeform">J'ai besoin d'aide</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectIdea;
