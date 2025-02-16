import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (userInfo?.id) setUserName(userInfo.name);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLogoutModalOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { path: "/", name: "Dashboard", icon: "fa-tachometer-alt" },
    { path: "/calculate", name: "Calculate", icon: "fa-calculator" },
    { path: "/leaderboard", name: "Leaderboard", icon: "fa-trophy" },
    { path: "/discover", name: "Discover", icon: "fa-compass" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="./app_logo.avif"
              alt="Logo"
              className="h-10 w-auto object-contain transform hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-md text-lg font-medium transition-all ${
                  location.pathname === link.path 
                    ? "text-primary bg-primary/10"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                <i className={`fas ${link.icon} mr-2`} />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Profile Section */}
          <div className="hidden md:flex items-center relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 group focus:outline-none"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <i className={`fas fa-chevron-down text-gray-500 text-sm transition-transform ${
                showProfileMenu ? "rotate-180" : ""
              }`} />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-xl border border-gray-100 animate-fade-in">
                <div className="py-1">
                  <button
                    onClick={() => navigate('/quiz-history')}
                    className="w-full px-4 py-3 flex items-center text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-history mr-3 text-gray-500" />
                    Quiz History
                  </button>
                  <button
                    onClick={() => navigate('/dashboard-test')}
                    className="w-full px-4 py-3 flex items-center text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-tachometer-alt mr-3 text-gray-500" />
                    New Dashboard Demo
                  </button>
                  <button
                    onClick={() => setLogoutModalOpen(true)}
                    className="w-full px-4 py-3 flex items-center text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt mr-3 text-gray-500" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-semibold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-700 font-medium">{userName}</span>
          </div>
        </div>

        <div className="py-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                location.pathname === link.path ? "bg-gray-50 border-l-4 border-primary" : ""
              }`}
            >
              <i className={`fas ${link.icon} mr-3 w-5 text-center`} />
              {link.name}
            </Link>
          ))}

          <div className="mt-4 border-t border-gray-100">
            <button
              onClick={() => navigate('/quiz-history')}
              className="w-full px-6 py-3 flex items-center text-gray-700 hover:bg-gray-50"
            >
              <i className="fas fa-history mr-3 text-gray-500" />
              Quiz History
            </button>
            <button
              onClick={() => setLogoutModalOpen(true)}
              className="w-full px-6 py-3 flex items-center text-gray-700 hover:bg-gray-50"
            >
              <i className="fas fa-sign-out-alt mr-3 text-gray-500" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </nav>
  );
};

export default Navbar;