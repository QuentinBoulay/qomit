import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgcase from "../../../../img/case-img.png";
import imgcase2 from "../../../../img/case-img2.png";

function Companies() {
  const cardsData = [
    {
      image1: {imgcase},
      text1: "My team and I are strong believers that personalized videos are a powerful way to build trusted relationships with our customers, and Potion is helping us do exactly that",
      subtitle: "Adrien Rossignol, Sales & Marketing Director, OVH ",
      image2: {imgcase2},
    },
    {
      image1: {imgcase},
      text1: "My team and I are strong believers that personalized videos are a powerful way to build trusted relationships with our customers, and Potion is helping us do exactly that",
      subtitle: "Quentin Boulay, Sales & Marketing Director, OVH ",
      image2: {imgcase2},
    },
    {
      image1: {imgcase},
      text1: "My team and I are strong believers that personalized videos are a powerful way to build trusted relationships with our customers, and Potion is helping us do exactly that",
      subtitle: "Adrien Rossignol, Sales & Marketing Director, OVH ",
      image2: {imgcase2},
    },
    {
      image1: {imgcase},
      text1: "My team and I are strong believers that personalized videos are a powerful way to build trusted relationships with our customers, and Potion is helping us do exactly that",
      subtitle: "Adrien Rossignol, Sales & Marketing Director, OVH ",
      image2: {imgcase2},
    },
    {
      image1: {imgcase},
      text1: "My team and I are strong believers that personalized videos are a powerful way to build trusted relationships with our customers, and Potion is helping us do exactly that",
      subtitle: "Adrien Rossignol, Sales & Marketing Director, OVH ",
      image2: {imgcase2},
    },
    // ...ajouter les autres cartes ici
  ];

  const sliderRef = useRef(null);

  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };

  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // afficher 3 cartes sur la même ligne
    slidesToScroll: 1,
    prevArrow: (
      <div className="custom-arrow custom-arrow-prev" onClick={handlePrevClick}>
        <svg
          width="27"
          height="19"
          viewBox="0 0 27 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.1742 0.344013C18.0013 0.137521 17.7494 0.0130264 17.48 0.000990531C17.2105 -0.0112336 16.9482 0.0901328 16.7574 0.280261C16.5668 0.470389 16.4649 0.731606 16.4772 1.00015C16.4894 1.26889 16.6144 1.51996 16.8216 1.69202L23.7229 8.5775H0.912159C0.580604 8.59517 0.281493 8.78154 0.120723 9.07097C-0.0402409 9.3602 -0.0402409 9.71171 0.120723 10.0011C0.281498 10.2905 0.580594 10.4769 0.912159 10.4944H23.7229L16.8109 17.3722C16.6369 17.5538 16.54 17.7951 16.54 18.0462C16.54 18.2972 16.6369 18.5387 16.8109 18.7202C16.9902 18.8994 17.2334 19 17.4873 19C17.7411 19 17.9845 18.8994 18.1636 18.7202L26.7122 10.2007V10.2009C26.896 10.0245 27 9.78114 27 9.52688C27 9.27243 26.896 9.02908 26.7122 8.85287L18.1742 0.344013Z"
            fill="black"
          />
        </svg>
      </div>
    ),
    nextArrow: (
      <div className="custom-arrow custom-arrow-next" onClick={handleNextClick}>
        <svg
          width="27"
          height="19"
          viewBox="0 0 27 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.82581 18.656C8.99866 18.8625 9.25058 18.987 9.52005 18.999C9.78952 19.0112 10.0518 18.9099 10.2426 18.7197C10.4332 18.5296 10.5351 18.2684 10.5228 17.9998C10.5106 17.7311 10.3856 17.48 10.1784 17.308L3.2771 10.4225L26.0878 10.4225C26.4194 10.4048 26.7185 10.2185 26.8793 9.92903C27.0402 9.6398 27.0402 9.28829 26.8793 8.9989C26.7185 8.70948 26.4194 8.52311 26.0878 8.50562L3.2771 8.50562L10.1891 1.62785C10.3631 1.44618 10.46 1.2049 10.46 0.953841C10.46 0.702782 10.3631 0.461333 10.1891 0.279831C10.0098 0.100609 9.76656 -1.5066e-06 9.51275 -1.52878e-06C9.25894 -1.55097e-06 9.01551 0.100609 8.83643 0.279831L0.287778 8.7993L0.287778 8.79911C0.10398 8.97551 4.66979e-06 9.21886 4.64756e-06 9.47312C4.62532e-06 9.72756 0.10398 9.97092 0.287778 10.1471L8.82581 18.656Z"
            fill="black"
          />
        </svg>
      </div>
    ),
    arrows: false, // désactiver les flèches par défaut
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="companies-container">
      <h2 className="text-center font-size-55">
        Approuvé par + de <br></br><span> 100</span> entreprises
      </h2>
      <Slider {...settings} ref={sliderRef}>
        {cardsData.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </Slider>
      <div className="custom-arrows mt-5 d-flex justify-content-center">
        <div
          className="custom-arrow d-flex justify-content-center align-items-center mr-5 custom-arrow-prev"
          onClick={handlePrevClick}
        >
<svg
            width="27"
            height="19"
            viewBox="0 0 27 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.82581 18.656C8.99866 18.8625 9.25058 18.987 9.52005 18.999C9.78952 19.0112 10.0518 18.9099 10.2426 18.7197C10.4332 18.5296 10.5351 18.2684 10.5228 17.9998C10.5106 17.7311 10.3856 17.48 10.1784 17.308L3.2771 10.4225L26.0878 10.4225C26.4194 10.4048 26.7185 10.2185 26.8793 9.92903C27.0402 9.6398 27.0402 9.28829 26.8793 8.9989C26.7185 8.70948 26.4194 8.52311 26.0878 8.50562L3.2771 8.50562L10.1891 1.62785C10.3631 1.44618 10.46 1.2049 10.46 0.953841C10.46 0.702782 10.3631 0.461333 10.1891 0.279831C10.0098 0.100609 9.76656 -1.5066e-06 9.51275 -1.52878e-06C9.25894 -1.55097e-06 9.01551 0.100609 8.83643 0.279831L0.287778 8.7993L0.287778 8.79911C0.10398 8.97551 4.66979e-06 9.21886 4.64756e-06 9.47312C4.62532e-06 9.72756 0.10398 9.97092 0.287778 10.1471L8.82581 18.656Z"
              fill="black"
            />
          </svg>
        </div>
        <div
          className="custom-arrow d-flex justify-content-center align-items-center ml-5 custom-arrow-next"
          onClick={handleNextClick}
        >
          <svg
            width="27"
            height="19"
            viewBox="0 0 27 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.1742 0.344013C18.0013 0.137521 17.7494 0.0130264 17.48 0.000990531C17.2105 -0.0112336 16.9482 0.0901328 16.7574 0.280261C16.5668 0.470389 16.4649 0.731606 16.4772 1.00015C16.4894 1.26889 16.6144 1.51996 16.8216 1.69202L23.7229 8.5775H0.912159C0.580604 8.59517 0.281493 8.78154 0.120723 9.07097C-0.0402409 9.3602 -0.0402409 9.71171 0.120723 10.0011C0.281498 10.2905 0.580594 10.4769 0.912159 10.4944H23.7229L16.8109 17.3722C16.6369 17.5538 16.54 17.7951 16.54 18.0462C16.54 18.2972 16.6369 18.5387 16.8109 18.7202C16.9902 18.8994 17.2334 19 17.4873 19C17.7411 19 17.9845 18.8994 18.1636 18.7202L26.7122 10.2007V10.2009C26.896 10.0245 27 9.78114 27 9.52688C27 9.27243 26.896 9.02908 26.7122 8.85287L18.1742 0.344013Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

const Card = ({ card }) => (
  <div className="card d-flex align-items-center">
    <img className="mb-5" src={imgcase} alt={card.text1} />
    <h3 className="text-center mb-5">{card.text1}</h3>
    <p className="mb-5">{card.subtitle}</p>
    <img src={imgcase2} alt={card.text1} />
  </div>
);

export default Companies;
