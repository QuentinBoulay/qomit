import React from 'react';
import Nav from '../Templates/Nav.js';
import Hero from './Hero.js';

function Home ()  {

  return (
    <>
    <Nav/>
    <Hero/>
    <div className='services'>
      <h2 className='font-size-82 text-center'>Nos services</h2>
    </div>
    </>
  );

};

export default Home;