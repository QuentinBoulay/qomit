import React from 'react';


function Hero ()  {

  return (
    <>
        <div className='hero text-center'>
        <h1>Suis ton projet web<br></br> de <span>A à Z.</span></h1>
        <div className='loop-container'>
            <svg width="40" height="40" viewBox="0 0 20 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 33C6.92683 22.1174 16.5854 0.483543 7.80488 1.00942C2.36098 9.42338 13 25.8423 19 33" stroke="#5959EB"/>
            </svg>
            <button className="mx-auto purple-button d-flex align-items-center">
            Demande de devis
            <box-icon name='right-arrow-alt' color='#ffffff' ></box-icon>
            </button>
        </div>
        <div className='loop-container'>
            <svg className="loop-2 position-absolute" width="150" height="420" viewBox="0 0 150 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 0.5C103 0.5 246 222.5 56.5 419" stroke="#5959EB"/>
            </svg>
        </div>
        <div className="d-flex mt-5 justify-content-center align-items-center">
            <a href="/"><box-icon name='linkedin' type='logo' color='#5959eb' style={{ marginRight: "20px", width: "30px", height: "30px" }} ></box-icon></a>
            <a href="/"><box-icon name='instagram' type='logo' color='#5959eb' style={{ width: "30px", height: "30px" }}  ></box-icon></a>
        </div>
        <div className='video-container mx-auto d-flex justify-content-center align-items-center'>
            <box-icon name='play' color='#5959eb' style={{ width: "100px", height: "100px" }} ></box-icon>
        </div>
        <div className='loop-container'>
            <svg className="loop-3 position-absolute" width="395" height="501" viewBox="0 0 395 501" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M167.036 1C9.5359 171 -193.864 553.9 394.536 493.5" stroke="#5959EB"/>
            </svg>
        </div>
        </div>
    </>
  );

};

export default Hero;




