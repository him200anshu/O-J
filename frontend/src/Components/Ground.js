import React from 'react';
import { Link } from 'react-router-dom';

function Ground() {
  return (
    <div>
      <h1>Welcome to Ground</h1>
      <nav>
        <ul>
          <li>
            <Link to="/adminlogin">AdminLogin</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
}

export default Ground;
