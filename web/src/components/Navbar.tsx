import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";


const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false); // Function to handle menu button click 
    const handleMenu = () => { setIsMenuOpen(!isMenuOpen); }
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleDropdownToggle = () => setDropdownOpen(!isDropdownOpen);
    const handleLogout = () => {
        // Handle logout logic here
    };

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (userInfo && userInfo.id) {
            setIsLoggedIn(true);
            setUserName(userInfo.name);
        }

    }, []);



    return (
        <nav className="px-10 flex bg-white justify-between items-center">

            <a href="#" id="brand">
                <img className="object-cover max-h-12" src="./app_logo.avif" alt="Logo" />
            </a>
            <div className="hidden md:flex gap-12" id="nav-menu">
                <Link
                    to="/"
                    className={`flex items-center font-display font-medium m-3 p-3 hover:bg-primary hover:text-white rounded-lg ${location.pathname === '/' ? 'bg-primary text-white' : ''}`}
                >
                    <i className="fas fa-tachometer-alt mr-2"></i>
                    <span className="text-xl">Dashboard</span>
                </Link>

                <Link
                    to="/calculate"
                    className={`flex items-center font-display font-medium m-3 p-3 hover:bg-primary hover:text-white rounded-lg ${location.pathname === '/calculate' ? 'bg-primary text-white' : ''}`}
                >
                    <i className="fa-solid fa-calculator mr-2"></i>
                    <span className="text-xl">Calculate</span>
                </Link>

                <Link
                    to="/leaderboard"
                    className={`flex items-center font-display font-medium m-3 p-3 hover:bg-primary hover:text-white rounded-lg ${location.pathname === '/leaderboard' ? 'bg-primary text-white' : ''}`}
                >
                    <i className="fa-solid fa-trophy mr-2"></i>
                    <span className="text-xl">Leaderboard</span>
                </Link>

                <Link
                    to="/discover"
                    className={`flex items-center font-display font-medium m-3 p-3 hover:bg-primary hover:text-white rounded-lg ${location.pathname === '/discover' ? 'bg-primary text-white' : ''}`}
                >
                    <i className="fa-solid fa-compass mr-2"></i>
                    <span className="text-xl">Discover</span>
                </Link>
            </div>
            <button className="hidden md:flex gap-2 items-center border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600">
                <i className="fa-solid fa-user"></i>
                <span>{userName}</span>
            </button>
            

            <button className="p-2 md:hidden" onClick={handleMenu}>
                <i className="fa-solid fa-bars text-gray-600"></i>
            </button>

            <div id="nav-dialog" className={`fixed z-10 md:hidden bg-background inset-0 p-3 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div id="nav-bar" className="flex justify-between">
                    <a href="#" id="brand" className="flex gap-2 items-center">
                        <img className="object-cover  max-h-12" src="./app_logo.avif" alt="Logo" />
                    </a>
                    <button className="p-2 md:hidden" onClick={handleMenu}>
                        <i className="fa-solid fa-xmark text-gray-600"></i>
                    </button>
                </div>
                <div className="mt-6">

                    <Link
                        to="/"
                        className={`flex items-center font-display font-medium m-3 p-3 hover:bg-primary hover:text-white rounded-lg ${location.pathname === '/' ? 'bg-primary text-white' : ''}`}
                    >
                        <i className="fas fa-tachometer-alt mr-2"></i>
                        <span className="text-xl">Dashboard</span>
                    </Link>

                    <Link
                        to="/calculate"
                        className={`flex items-center font-display font-medium m-3 p-3 hover:bg-primary hover:text-white rounded-lg ${location.pathname === '/calculate' ? 'bg-primary text-white' : ''}`}
                    >
                        <i className="fa-solid fa-calculator mr-2"></i>
                        <span className="text-xl">Calculate</span>
                    </Link>

                    <Link
                        to="/leaderboard"
                        className={`flex items-center font-display font-medium m-3 p-3 hover:bg-primary hover:text-white rounded-lg ${location.pathname === '/leaderboard' ? 'bg-primary text-white' : ''}`}
                    >
                        <i className="fa-solid fa-trophy mr-2"></i>
                        <span className="text-xl">Leaderboard</span>
                    </Link>

                    <Link
                        to="/discover"
                        className={`flex items-center font-display font-medium m-3 p-3 hover:bg-primary hover:text-white rounded-lg ${location.pathname === '/discover' ? 'bg-primary text-white' : ''}`}
                    >
                        <i className="fa-solid fa-compass mr-2"></i>
                        <span className="text-xl">Discover</span>
                    </Link>


                </div>

                <div className="h-[1px] bg-gray300"></div>
                <button className="mt-6 w-full flex gap-2 items-center px-6 py-2 rounded-lg hover:bg-gray50">
                    <i className="fa-solid fa-user"></i>
                    <span>`${userName}`</span>
                </button>


            </div>


        </nav>



    );
}

export default Navbar;

const Divider: React.FC = () => <div className="border-t border-gray-200 my-2"></div>;


   