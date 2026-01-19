import React, { useState, useEffect, useRef } from 'react';
import './HorizontalMenu.scss';

const HorizontalMenu: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLElement>(null);
  const menuTopOffset = useRef(0);

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Scroll to posts section smoothly
    const postsSection = document.querySelector('.post-grid');
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    // Get the initial top position of the menu
    if (menuRef.current) {
      menuTopOffset.current = menuRef.current.offsetTop;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 200;

      // Check if menu should be sticky
      if (currentScrollY >= menuTopOffset.current) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
        setIsHidden(false); // Always show when not sticky
        lastScrollY.current = currentScrollY;
        return;
      }

      // Only apply hide/show logic when sticky
      if (isSticky) {
        const scrollDiff = currentScrollY - lastScrollY.current;

        // Scrolling down and past threshold
        if (scrollDiff > 0 && currentScrollY > menuTopOffset.current + scrollThreshold) {
          setIsHidden(true);
        }
        // Scrolling up
        else if (scrollDiff < 0) {
          setIsHidden(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  const menuItems = [
    { 
      id: 1, 
      label: 'Home', 
      href: '#',
      submenu: [
        { id: 11, label: 'Home Style 1', href: '#' },
        { id: 12, label: 'Home Style 2', href: '#' },
        { id: 13, label: 'Home Style 3', href: '#' },
      ]
    },
    { 
      id: 2, 
      label: 'About', 
      href: '#',
      submenu: [
        { id: 21, label: 'About Us', href: '#' },
        { id: 22, label: 'Our Team', href: '#' },
        { id: 23, label: 'Careers', href: '#' },
      ]
    },
    { id: 3, label: 'Services', href: '#' },
    { 
      id: 4, 
      label: 'Portfolio', 
      href: '#',
      submenu: [
        { id: 41, label: 'Grid View', href: '#' },
        { id: 42, label: 'List View', href: '#' },
      ]
    },
    { id: 5, label: 'Blog', href: '#' },
    { id: 6, label: 'Contact', href: '#' },
  ];

  return (
    <nav 
      ref={menuRef}
      className={`horizontal-menu ${isSticky ? 'horizontal-menu--sticky' : ''} ${isHidden ? 'horizontal-menu--hidden' : ''}`}
    >
      <div className="container">
        <ul className="horizontal-menu__list">
          {menuItems.map((item) => (
            <li key={item.id} className="horizontal-menu__item">
              <a 
                href={item.href} 
                className="horizontal-menu__link"
                onClick={handleMenuClick}
              >
                {item.label}
              </a>
              {item.submenu && (
                <ul className="horizontal-menu__submenu">
                  {item.submenu.map((subitem) => (
                    <li key={subitem.id} className="horizontal-menu__submenu-item">
                      <a 
                        href={subitem.href} 
                        className="horizontal-menu__submenu-link"
                        onClick={handleMenuClick}
                      >
                        {subitem.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default HorizontalMenu;
