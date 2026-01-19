import React, { useEffect } from 'react';
import './MobileMenu.scss';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    
    // Scroll to posts section smoothly
    setTimeout(() => {
      const postsSection = document.querySelector('.post-grid');
      if (postsSection) {
        postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); // Wait for menu close animation
  };

  const menuItems = [
    { id: 1, label: 'Home', href: '#' },
    { id: 2, label: 'About', href: '#' },
    { id: 3, label: 'Services', href: '#' },
    { id: 4, label: 'Portfolio', href: '#' },
    { id: 5, label: 'Blog', href: '#' },
    { id: 6, label: 'Contact', href: '#' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`mobile-menu__backdrop ${isOpen ? 'mobile-menu__backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu */}
      <aside 
        className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu__header">
          <button 
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <span>&times;</span>
          </button>
        </div>

        <nav className="mobile-menu__nav">
          <ul className="mobile-menu__list">
            {menuItems.map((item) => (
              <li key={item.id} className="mobile-menu__item">
                <a 
                  href={item.href} 
                  className="mobile-menu__link"
                  onClick={handleMenuClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MobileMenu;
