import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
function Header() {
  return (
    <header>
      <div className="menu-btn"></div>
      <div className="navigation">
        <div className="navigation-items">
          <Link to="/Creators">Creators</Link>
          <Link to="/Features">Features</Link>
          <Link to="/Pricing">Pricing</Link>
          <Link to="/Resources">Resources</Link>
        </div>
      </div>
      <Link to="/" className="brand">Creatreon</Link>
      <div className="right items">
        <input type="search" className="onesearch" placeholder="Find a Creator" data-results="false" defaultValue=""
          inputMode="search" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
          aria-labelledby="search-label" />
        <Link to="/loginpage" className="onebut">
          <button data-label="Log in">Log in</button>
        </Link>
        <Link to="/loginpage" className="twobut">
          <button data-label="Get Started" className="">Get Started</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
