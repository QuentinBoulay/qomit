import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from '../../../img/logo.png';

class BrandSlider extends Component {
  render() {
    const settings = {
      autoplay: true,
      autoplaySpeed: 3000,
      cssEase: 'linear', // transition linéaire
      arrows: false,
      dots: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3
          }
        }
      ]
    };

    return (
      <div className="brand-slider">
        <Slider {...settings}>
          <img src={logo} alt="logo" />
          <img src={logo} alt="logo" />
          <img src={logo} alt="logo" />
          <img src={logo} alt="logo" />
          <img src={logo} alt="logo" />
          <img src={logo} alt="logo" />
          <img src={logo} alt="logo" />
        </Slider>
      </div>
    );
  }
}

export default BrandSlider;
