import React, { useEffect, useRef, useState } from 'react';
import { FaUserCircle, FaTachometerAlt, FaTrophy, FaCompass, FaCalculator, FaChevronDown, FaChevronUp, FaSignOutAlt, FaBars, FaTimes  } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import AppLogo from './app_logo.avif';
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom';



const Navbar: React.FC = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      if (userInfo && userInfo.id) {
        setIsLoggedIn(true);
        setUserName(userInfo.name);
      }
      setIsLoggedIn(true);
    }, []);
 
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
  

  const handleMenuItemClick = (_item: string) => {
    
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };



  const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <StyledNavbar>
      <div>
        <Logo src={AppLogo} alt="Logo" />
      </div>
      <MenuIcon onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </MenuIcon>
      
      <MobileMenu isMenuOpen={isMenuOpen}>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <MenuItem
             isActive = {location.pathname === '/'}
             onClick={(e) => {
              createRipple(e);
              handleMenuItemClick('Dashboard');
            }}
          >
            <FaTachometerAlt style={{ marginRight: '8px', marginLeft: '4px', fontSize: '20px' }} /> Dashboard
          </MenuItem>
        </NavLink>
        <NavLink to="/calculate" style={{ textDecoration: 'none' }}>
          <MenuItem
            isActive ={location.pathname === '/calculate'}
            onClick={(e) => {
              createRipple(e);
              handleMenuItemClick('Calculate');
            }}
          >
            <FaCalculator style={{ marginRight: '8px', marginLeft: '4px', fontSize: '20px' }} /> Calculate
          </MenuItem>
        </NavLink>
        <NavLink to="/leaderboard" style={{ textDecoration: 'none' }}>
          <MenuItem
            isActive ={location.pathname === '/leaderboard'}
            onClick={(e) => {
              createRipple(e);
              handleMenuItemClick('Leaderboard');
            }}
          >
            <FaTrophy style={{ marginRight: '8px', marginLeft: '4px', fontSize: '20px' }} /> Leaderboard
          </MenuItem>
        </NavLink>
        <NavLink to="/discover" style={{ textDecoration: 'none' }}>
          <MenuItem
            isActive ={location.pathname === '/discover'}
            onClick={(e) => {
              createRipple(e);
              handleMenuItemClick('Discover');
            }}
          >
            <FaCompass style={{ marginRight: '8px', marginLeft: '4px', fontSize: '20px' }} /> Discover
          </MenuItem>
        </NavLink>
      </MobileMenu>

      <Menu>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <MenuItem
            isActive={location.pathname === '/'}
            onClick={(e) => {
              createRipple(e);
              handleMenuItemClick('Dashboard');
            }}
          >
            <FaTachometerAlt style={{ marginRight: '8px', marginLeft: '4px', fontSize: '20px' }} /> Dashboard
          </MenuItem>
        </NavLink>
        <NavLink to="/calculate" style={{ textDecoration: 'none' }}>
          <MenuItem
            isActive={location.pathname === '/calculate'}
            onClick={(e) => {
              createRipple(e);
              handleMenuItemClick('Calculate');
            }}
          >
            <FaCalculator style={{ marginRight: '8px', marginLeft: '4px', fontSize: '20px' }} /> Calculate
          </MenuItem>
        </NavLink>
        <NavLink to="/leaderboard" style={{ textDecoration: 'none' }}>
          <MenuItem
            isActive={location.pathname === '/leaderboard'}
            onClick={(e) => {
              createRipple(e);
              handleMenuItemClick('Leaderboard');
            }}
          >
            <FaTrophy style={{ marginRight: '8px', marginLeft: '4px', fontSize: '20px' }} /> Leaderboard
          </MenuItem>
        </NavLink>
        <NavLink to="/discover" style={{ textDecoration: 'none' }}>
          <MenuItem
            isActive={location.pathname === '/discover'}
            onClick={(e) => {
              createRipple(e);
              handleMenuItemClick('Discover');
            }}
          >
            <FaCompass style={{ marginRight: '8px', marginLeft: '4px', fontSize: '20px' }} /> Discover
            </MenuItem>
            </NavLink>
            </Menu>
      <Right>
        {isLoggedIn ? (
          <Wrapper ref={wrapperRef} isDropdownOpen={isDropdownOpen} onClick={handleDropdownToggle}>
            <FaUserCircle style={{ color: '#00072D', fontSize: '20px', marginRight: '8px', marginLeft: '4px' }} />
            <UserName>{userName}</UserName>
            {isDropdownOpen ? <FaChevronUp style={{ color: '#00072D', fontSize: '20px', marginRight: '8px', marginLeft: '4px' }} /> : <FaChevronDown style={{ color: '#00072D', fontSize: '20px', marginRight: '8px', marginLeft: '4px' }} />}
            <Dropdown isDropdownOpen={isDropdownOpen}>
              <Divider />
              <DropdownItem onClick={handleLogout}>
                <FaSignOutAlt style={{ marginRight: '10px' }} /> Logout
              </DropdownItem>
            </Dropdown>
          </Wrapper>
        ) : (
          <NavLink to="/login" style={{ textDecoration: 'none' }}>
            <LoginButton
              onClick={handleLogin}
              onMouseOver={(e) => (e.currentTarget.style.color = '#F2DFA4')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'white')}
            >
              <FiLogIn style={{ color: '#00072D', fontSize: '20px', marginRight: '8px', marginLeft: '4px' }} /> Login
            </LoginButton>
          </NavLink>
        )}
      </Right>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: white;
  flex-wrap: wrap;
`;

const Logo = styled.img`
  height: 40px;
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 80px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div<{isMenuOpen: boolean}>`
  display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 10px;
`;

const MenuItem = styled.div<{ isActive: boolean }>`
  margin-left: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  color: white;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  padding: 10px 0;

  ${({ isActive }) => isActive && `
    color: #F2DFA4;
  `}

  &:hover {
    color: #F2DFA4;
  }
`;



const LoginButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.3s;

  &:hover {
    color: #F2DFA4;
  }
`;

const Wrapper = styled.div<{isDropdownOpen: boolean}>`
  display: flex;
  align-items: center;
  background-color: #F2DFA4;
  border-radius: ${({ isDropdownOpen }) => (isDropdownOpen ? '15px 15px 0 0' : '15px')};
  padding: 10px 20px;
  position: relative;
  cursor: pointer;
  transition: border-radius 0.3s;
`;

const UserName = styled.span`
  font-weight: bold;
  color: #00072D;
  margin-right: 8px;
`;

const Dropdown = styled.div<{isDropdownOpen: boolean}>`
  position: absolute;
  top: calc(100% - 10px);
  left: 0;
  background-color: #F2DFA4;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 10px 10px;
  padding: 10px;
  width: 100%;
  z-index: 1000;
  display: ${({ isDropdownOpen }) => (isDropdownOpen ? 'block' : 'none')};
  animation: ${({ isDropdownOpen }) => (isDropdownOpen ? 'fadeIn 0.5s' : '')};
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(0, 7, 45, 0.5);
  margin: 10px 0;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px 0;
  color: #00072D;
  font-weight: bold;
`;




export default Navbar;
