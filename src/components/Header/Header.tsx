import React from 'react';
import './Header.scss';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <button 
            className="header__mobile-toggle"
            onClick={onMenuToggle}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="header__logo">
            <h1>LOGO</h1>
          </div>

          <div className="header__actions">
            {/* Placeholder for any header actions like search icon, user icon, etc. */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
