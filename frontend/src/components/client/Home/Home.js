import React from 'react';
import Nav from '../Templates/Nav.js';

function Home ()  {

  return (
    <>
    <Nav/>

    <div className='hero'>
      <h1 className='font-size-96 text-center'>Suis ton projet web<br></br> de <span>A à Z.</span></h1>
      <div className='d-flex justify-content-center'>
        <a href='/' className="mt-5 purple-button d-inline-block text-center">Demande de devis <box-icon name='right-arrow-alt' color='#ffffff' ></box-icon></a>
      </div>
    </div>
    </>
  );

};

export default Home;