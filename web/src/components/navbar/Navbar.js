// src/components/Navbar.js
import React, { useEffect, useRef, useState } from 'react';
import { FaUserCircle, FaTachometerAlt, FaTrophy, FaCompass, FaCalculator, FaChevronDown, FaChevronUp, FaSignOutAlt, FaBars, FaTimes  } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import AppLogo from './app_logo.avif';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const wrapperRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


 

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.id) {
        setIsLoggedIn(true);
        setUserName(userInfo.name)
      }
    setIsLoggedIn(true);
  })
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.reload(); 
  }
  

  const handleMenuItemClick = (item) => {
    
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      color: 'white',
      flexWrap: 'wrap',
    },
    logo: {
      height: '40px',
    },
    menuIcon: {
      display: 'none',
      fontSize: '24px',
      cursor: 'pointer',
    },
    right: {
      display: 'flex',
      alignItems: 'center',
    },
    menu: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '80px',
    },
    mobileMenu: {
      display: isMenuOpen ? 'block' : 'none',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      marginTop: '10px',
    },
    menuItem: {
      marginLeft: '20px',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      color: 'white',
      transition: 'color 0.3s',
      display: 'flex',
      alignItems: 'center',
      padding: '10px 0',
    },
    activeMenuItem: {
      color: '#F2DFA4',
    },
    icon: {
      color: '#00072D',
      fontSize: '20px',
      marginRight: '8px',
      marginLeft: '4px',
    },
    navIcon: {
      fontSize: '20px',
      marginRight: '8px',
      marginLeft: '4px',
    },
    loginButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'color 0.3s',
    },
    ripple: {
      position: 'absolute',
      borderRadius: '50%',
      transform: 'scale(0)',
      animation: 'ripple 0.6s linear',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#F2DFA4',
      borderRadius: isDropdownOpen ? '15px 15px 0 0' : '15px',
      padding: '10px 20px',
      position: 'relative',
      cursor: 'pointer',
      transition: 'border-radius 0.3s',
    },
    userName: {
      fontWeight: 'bold',
      color: '#00072D',
      marginRight: '8px',
    },
    dropdown: {
      position: 'absolute',
      top: 'calc(100% - 10px)',
      left: '0',
      backgroundColor: '#F2DFA4',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '0 0 10px 10px',
      padding: '10px',
      width: '100%',
      zIndex: 1000,
      display: isDropdownOpen ? 'block' : 'none',
      animation: isDropdownOpen ? 'fadeIn 0.5s' : '',
    },
    divider: {
      height: '1px',
      backgroundColor: 'rgba(0, 7, 45, 0.5)',
      margin: '10px 0',
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: '10px 0',
      color: '#00072D',
      fontWeight: 'bold',
    },
    dropdownItemIcon: {
      marginRight: '10px',
    },
    '@media (max-width: 768px)': {
      menu: {
        display: 'none',
      },
      menuIcon: {
        display: 'block',
      },
      mobileMenu: {
        display: isMenuOpen ? 'flex' : 'none',
      },
    },
  };

const location = useLocation();

  const getMenuItemStyle = (path) => {
    return location.pathname === path ? { ...styles.menuItem, ...styles.activeMenuItem } : styles.menuItem;
  };

  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return  (
    <nav style={styles.navbar}>
      <div>
        <img src={AppLogo} alt="Logo" style={styles.logo} />
      </div>
      <div style={styles.menuIcon} onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div style={isMenuOpen ? styles.mobileMenu : styles.menu}>
        <NavLink to="/" exact style={{ textDecoration: 'none' }}>
          <div
            style={getMenuItemStyle('/')}
            onClick={(e) => {
              createRipple(e);
              handleMenuItemClick('Dashboard');
            }}
          >
            <FaTachometerAlt style={styles.navIcon} /> Dashboard
          </div>
        </NavLink>
        <NavLink to="/calculate" style={{ textDecoration: 'none' }}>
          <div
            style={getMenuItemStyle('/calculate')}
            onClick={(e) => {
              createRipple(e);
              handleMenuItemClick('Calculate');
            }}
          >
            <FaCalculator style={styles.navIcon} /> Calculate
          </div>
        </NavLink>
        <NavLink to="/leaderboard" style={{ textDecoration: 'none' }}>
          <div
            style={getMenuItemStyle('/leaderboard')}
            onClick={(e) => {
              createRipple(e);
              handleMenuItemClick('Leaderboard');
            }}
          >
            <FaTrophy style={styles.navIcon} /> Leaderboard
          </div>
        </NavLink>
        <NavLink to="/discover" style={{ textDecoration: 'none' }}>
          <div
            style={getMenuItemStyle('/discover')}
            onClick={(e) => {
              createRipple(e);
              handleMenuItemClick('Discover');
            }}
          >
            <FaCompass style={styles.navIcon} /> Discover
          </div>
        </NavLink>
      </div>
      <div style={styles.right}>
        {isLoggedIn ? (
          <div ref={wrapperRef} style={styles.wrapper} onClick={handleDropdownToggle}>
            <FaUserCircle style={styles.icon} />
            <span style={styles.userName}>{userName}</span>
            {isDropdownOpen ? <FaChevronUp style={styles.icon} /> : <FaChevronDown style={styles.icon} />}
            <div style={styles.dropdown}>
              <div style={styles.divider}></div>
              <div style={styles.dropdownItem} onClick={handleLogout}>
                <FaSignOutAlt style={styles.dropdownItemIcon} /> Logout
              </div>
            </div>
          </div>
        ) : (
          <NavLink to="/login" style={{ textDecoration: 'none' }}>
            <button
              onClick={handleLogin}
              style={styles.loginButton}
              onMouseOver={(e) => (e.currentTarget.style.color = '#F2DFA4')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'white')}
            >
              <FiLogIn style={styles.icon} /> Login
            </button>
          </NavLink>
        )}
      </div>
    </nav>
  );

}



export default Navbar;
