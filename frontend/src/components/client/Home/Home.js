import React from 'react';
import Nav from '../Templates/Nav.js';

function Home ()  {

  return (
    <>
    <Nav/>

    <div className='hero text-center'>
      <h1>Suis ton projet web<br></br> de <span>A à Z.</span></h1>
      <button className="mx-auto mt-5 purple-button d-flex align-items-center">
      Demande de devis
      <box-icon name='right-arrow-alt' color='#ffffff' ></box-icon>
      </button>
      <div className="d-flex mt-5 justify-content-center align-items-center">
        <a href="/"><box-icon name='linkedin' type='logo' color='#5959eb' style={{ marginRight: "20px", width: "50px", height: "50px" }} ></box-icon></a>
        <a href="/"><box-icon name='instagram' type='logo' color='#5959eb' style={{ width: "50px", height: "50px" }}  ></box-icon></a>
      </div>
      <div className='video-container mx-auto d-flex justify-content-center align-items-center'>
        <box-icon name='play' color='#5959eb' style={{ width: "100px", height: "100px" }} ></box-icon>
      </div>
        
    </div>
    </>
  );

};

export default Home;