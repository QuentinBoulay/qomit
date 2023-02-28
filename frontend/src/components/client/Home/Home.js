import React from 'react';
import Nav from '../Templates/Nav.js';
import Hero from './Hero.js';

function Home ()  {

  return (
    <>
    <Nav/>
    <Hero/>
    <div className='services'>
      <h2 className='font-size-82 text-center'>Nos <div className='underline-container d-inline-block px-3'>services</div></h2>
      <div className='row justify-content-between'>
        <div className='description-service col-12 col-lg-6'>
          <p>01.</p>
          <lottie-player src="https://lottie.host/c0890e44-a909-4372-b769-660d161f67a9/hLjYM7mcxj.json" background="transparent" speed="1" style={{width: '500px', height: '500px', margin: '0 auto'}} loop autoplay></lottie-player>
          <h3 className='mt-5'>Développement web</h3>
          <p>Lorem ipsum.</p>
        </div>
        <div className='group-buttons-services col-12 col-lg-4'>
          <div className='input-container d-flex justify-content-end align-items-center'>
            <p>01.</p>
            <h3>Développement web</h3>
            <box-icon name='plus' color='#ffffff' ></box-icon>
          </div>
        </div>
      </div>
    </div>
    </>
  );

};

export default Home;