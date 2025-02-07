import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";



const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false); // Function to handle menu button click 
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const handleMenu = () => { setIsMenuOpen(!isMenuOpen); }
    const location = useLocation();
    const [userName, setUserName] = useState<string>('');
    const navigate = useNavigate();


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (userInfo && userInfo.id) {
            setUserName(userInfo.name);
        }

    }, []);

    const handleLogout = () => { // Clear local storage data 
        localStorage.clear();
        setLogoutModalOpen(false); // Redirect to login page 
        navigate('/login')

    };


    return (
        <nav className="px-10 flex bg-white justify-between items-center">

            <Link
                to="/"
                id="brand"
            >
                <img
                    src="./app_logo.avif"
                    alt="IndiaWaterPortal Logo"
                    className="hidden md:block h-10 w-auto object-contain"
                />
            </Link>

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
            <button className="hidden md:flex gap-4 items-center border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600 " data-modal-target="deleteModal" data-modal-toggle="deleteModal" onClick={() => setLogoutModalOpen(true)} type="button">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-user"></i>
                    <span>{userName}</span>
                </div>
                <div className="border border-black"></div> {/* Vertical Divider */}
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
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

                    <button className='w-full' onClick={handleMenu}>
                        <Link
                            to="/"
                            className={`flex items-center font-display font-medium m-3 p-3 hover:bg-primary hover:text-white rounded-lg ${location.pathname === '/' ? 'bg-primary text-white' : ''}`}
                        >
                            <i className="fas fa-tachometer-alt mr-2"></i>
                            <span className="text-xl">Dashboard</span>
                        </Link>
                    </button>


                    <button className='w-full' onClick={handleMenu}>
                        <Link
                            to="/calculate"
                            className={`flex items-center font-display font-medium m-3 p-3 hover:bg-primary hover:text-white rounded-lg ${location.pathname === '/calculate' ? 'bg-primary text-white' : ''}`}
                        >
                            <i className="fa-solid fa-calculator mr-2"></i>
                            <span className="text-xl">Calculate</span>
                        </Link>
                    </button>


                    <button className='w-full' onClick={handleMenu}><Link
                        to="/leaderboard"
                        className={`flex items-center font-display font-medium m-3 p-3 hover:bg-primary hover:text-white rounded-lg ${location.pathname === '/leaderboard' ? 'bg-primary text-white' : ''}`}
                    >
                        <i className="fa-solid fa-trophy mr-2"></i>
                        <span className="text-xl">Leaderboard</span>
                    </Link></button>


                    <button className='w-full' onClick={handleMenu}>
                        <Link
                            to="/discover"
                            className={`flex items-center font-display font-medium m-3 p-3 hover:bg-primary hover:text-white rounded-lg ${location.pathname === '/discover' ? 'bg-primary text-white' : ''}`}
                        >
                            <i className="fa-solid fa-compass mr-2"></i>
                            <span className="text-xl">Discover</span>
                        </Link>
                    </button>



                </div>

                <div className="h-[1px] bg-gray300"></div>
                <button className="mt-6 w-full flex gap-2 items-center px-6 py-2 rounded-lg hover:bg-gray50" onClick={() => setLogoutModalOpen(true)}>
                    <i className="fa-solid fa-user"></i>
                    <span>{userName}</span>
                </button>


            </div>


            <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setLogoutModalOpen(false)} onConfirm={handleLogout} />





        </nav>





    );
}

export default Navbar;






