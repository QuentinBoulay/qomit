import React, { useState } from "react";

function Services() {
  const [selectedService, setSelectedService] = useState({
    num: "01",
    title: "Développement web",
    text: "Qomit se spécialise en développement web, offrant des solutions adaptées aux besoins de chaque client avec des technologies de pointe comme React JS, Vue JS, Next JS, Angular, Symfony ou des CMS sur mesure. Bénéficiez d'un accompagnement personnalisé pour des projets numériques à la fois innovants et performants.   ",
    gif: "https://lottie.host/c0890e44-a909-4372-b769-660d161f67a9/hLjYM7mcxj.json",
  });

  const [key, setKey] = useState(0); // Ajout de la variable key

  const handleServiceClick = (num, title, text, gif) => {
    setSelectedService({ num, title, text, gif });
    setKey(key + 1); // Mise à jour de la clé
  };
  return (
    <>
      <div className="services" id="services">
        <h2 className="font-size-55 text-center">
          Ce que{" "}
          <div className="underline-container d-inline-block px-3">
            Qomit
          </div>
          {" "}vous propose
        </h2>
        <div className="row justify-content-between">
          <div className="description-service col-12 col-lg-6 col-xs-12 mr-1">
            <p className="font-size-28">{selectedService.num}</p>
            <lottie-player
              src={selectedService.gif}
              key={key} // Utilisation de la clé
              background="transparent"
              speed="1"
              style={{ width: "300px", height: "300px", margin: "0 auto" }}
              loop
              autoplay
            ></lottie-player>
            <h3 className="mt-5 mb-4">{selectedService.title}</h3>
            <p>{selectedService.text}</p>
          </div>
          <div className="group-buttons-services col-12 col-lg-5 col-xs-12">
            <div
              className={`input-container ${
                selectedService.num === "01" ? "active-input" : ""
              } d-flex justify-content-between align-items-center mb-4`}
              onClick={() =>
                handleServiceClick(
                  "01",
                  "Développement web",
                  "Qomit se spécialise en développement web, offrant des solutions adaptées aux besoins de chaque client avec des technologies de pointe comme React JS, Vue JS, Next JS, Angular, Symfony ou des CMS sur mesure. Bénéficiez d'un accompagnement personnalisé pour des projets numériques à la fois innovants et performants.   ",
                  "https://lottie.host/c0890e44-a909-4372-b769-660d161f67a9/hLjYM7mcxj.json"
                )
              }
            >
              <p className="mb-0 font-size-22">01.</p>
              <h3 className="mb-0">Développement web</h3>
            </div>
            <div
              className={`input-container ${
                selectedService.num === "02" ? "active-input" : ""
              } d-flex justify-content-between align-items-center mb-4`}
              onClick={() =>
                handleServiceClick(
                  "02",
                  "Maintenance technique",
                  "Qomit prolonge son accompagnement grâce à son offre de maintenance technique. Nous assurons les mises à jour de site web, l'ajout de prestations, la modification de contenu, les correctifs techniques et le suivi de la sécurité. Notre agence garantit une présence en ligne solide et durable, soutenant ainsi la réussite de votre entreprise.",
                  "https://lottie.host/e39a53a5-eb5e-4c35-bc64-c1c525a41d82/oldLji35qk.json"
                )
              }
            >
              <p className="mb-0 font-size-22">02.</p>
              <h3 className="mb-0">Maintenance technique</h3>
            </div>
            <div
              className={`input-container ${
                selectedService.num === "03" ? "active-input" : ""
              } d-flex justify-content-between align-items-center mb-4`}
              onClick={() =>
                handleServiceClick(
                  "03",
                  "Marketing web",
                  "Qomit élargit votre portée grâce à notre offre de marketing web complète. Nous déployons des stratégies innovantes en SEO, SEA, emailing et autres solutions digitales pour propulser votre entreprise au-devant de la concurrence. Découvrez notre approche personnalisée pour maximiser votre visibilité en ligne.",
                  "https://lottie.host/2701362e-b03e-41fd-961c-b5277dbc789b/aCvD8DkmxL.json"
                )
              }
            >
              <p className="mb-0 font-size-22">03.</p>
              <h3 className="mb-0">Marketing web</h3>
            </div>
            <div
              className={`input-container ${
                selectedService.num === "04" ? "active-input" : ""
              } d-flex justify-content-between align-items-center mb-4`}
              onClick={() =>
                handleServiceClick(
                  "04",
                  "Web design",
                  "Qomit sublime votre identité visuelle grâce à notre offre de webdesign créatif et sur mesure. Nos experts conçoivent votre charte graphique, réalisent des maquettes captivantes et développent des prototypes fonctionnels pour offrir à votre entreprise un site web esthétique et ergonomique, reflétant parfaitement votre image de marque.",
                  "https://lottie.host/c0890e44-a909-4372-b769-660d161f67a9/hLjYM7mcxj.json"
                )
              }
            >
              <p className="mb-0 font-size-22">04.</p>
              <h3 className="mb-0">Web design</h3>
            </div>

            <div
              className={`input-container ${
                selectedService.num === "05" ? "active-input" : ""
              } d-flex justify-content-between align-items-center mb-4`}
              onClick={() =>
                handleServiceClick(
                  "05",
                  "Plateforme Qomit",
                  "Avec Qomit, bénéficiez d'une plateforme centralisée pour suivre votre projet, poser des questions et accéder aux documents.",
                  "https://lottie.host/c0890e44-a909-4372-b769-660d161f67a9/hLjYM7mcxj.json"
                )
              }
            >
              <p className="mb-0 font-size-22">05.</p>
              <h3 className="mb-0">Plateforme Qomit</h3>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Services;
