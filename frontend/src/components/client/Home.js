import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
        <nav>
            <ul>
                <li>
                <Link to="/admin/posts">Espace client</Link>
                </li>
            </ul>
        </nav>
  </div>
  );

}

export default Home;