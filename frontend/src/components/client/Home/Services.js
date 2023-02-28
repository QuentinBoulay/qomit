import React, { useState } from "react";

function Services() {
  const [selectedService, setSelectedService] = useState({
    num: "01",
    title: "Développement web",
    text: "Lorem ipsum dolor sit amet. Praesent eu est a velit viverra aliquam.",
    gif: "https://lottie.host/c0890e44-a909-4372-b769-660d161f67a9/hLjYM7mcxj.json",
  });

  const [key, setKey] = useState(0); // Ajout de la variable key

  const handleServiceClick = (num, title, text, gif) => {
    setSelectedService({ num, title, text, gif });
    setKey(key + 1); // Mise à jour de la clé
  };
  return (
    <>
      <div className="services">
        <h2 className="font-size-55 text-center">
          Nos{" "}
          <div className="underline-container d-inline-block px-3">
            services
          </div>
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
                  "Lorem ipsum dolor sit amet. Praesent eu est a velit viverra aliquam.",
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
                  "Lorem ipsum dolor sit amet. Praesent eu est a velit viverra aliquam.",
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
                  "Accompagnement",
                  "Lorem ipsum dolor sit amet. Praesent eu est a velit viverra aliquam.",
                  "https://lottie.host/2701362e-b03e-41fd-961c-b5277dbc789b/aCvD8DkmxL.json"
                )
              }
            >
              <p className="mb-0 font-size-22">03.</p>
              <h3 className="mb-0">Accompagnement</h3>
            </div>
            <div
              className={`input-container ${
                selectedService.num === "04" ? "active-input" : ""
              } d-flex justify-content-between align-items-center mb-4`}
              onClick={() =>
                handleServiceClick(
                  "04",
                  "Conseil",
                  "Lorem ipsum dolor sit amet. Praesent eu est a velit viverra aliquam.",
                  "https://lottie.host/c0890e44-a909-4372-b769-660d161f67a9/hLjYM7mcxj.json"
                )
              }
            >
              <p className="mb-0 font-size-22">04.</p>
              <h3 className="mb-0">Conseil</h3>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Services;
