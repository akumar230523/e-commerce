import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThemeContext from '../context/Theme';
import { logout } from '../store/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
    const { isTheme, setIsTheme } = useContext(ThemeContext);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const cartCount = useSelector((state) => state.cart.cartitems.length);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTheme = () => setIsTheme((prev) => !prev);
    const toggleNav = () => setIsNavOpen((prev) => !prev);

    const handleLogout = () => {
        dispatch(logout());
        toast.info('Logged out successfully!');
        navigate('/');
    };

    // Always light text on dark background
    const navLinkClass = ({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
            ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'  
        }`;

    return (
        <header className="fixed top-0 w-full bg-gray-800 text-white shadow-md z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <NavLink to="/" className="flex items-center space-x-2">
                            <img src="/ShoppyGlobe.png" alt="ShoppyGlobe" className="h-8 w-8" />
                            <span className="text-xl font-bold text-white"> ShoppyGlobe </span>
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-4">
                        <NavLink to="/" className={navLinkClass} end>
                            <i className="fa-regular fa-house mr-1"></i> Home
                        </NavLink>
                        <NavLink to="/product-list" className={navLinkClass}>
                            <i className="fa-brands fa-product-hunt mr-1"></i> Products
                        </NavLink>
                        <NavLink to="/cart" className={navLinkClass}>
                            <i className="fa-solid fa-cart-shopping mr-1"></i> Cart
                            {cartCount > 0 && (
                                <sup className="ml-1 px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full">
                                    {cartCount}
                                </sup>
                            )}
                        </NavLink>
                        <NavLink to="/ach" className={navLinkClass}>
                            <i className="fa-solid fa-info mr-1"></i> Help
                        </NavLink>
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={handleTheme}
                            className="p-2 rounded-md text-gray-300 hover:bg-gray-700"
                        >
                            <i className={`fa-solid ${isTheme ? 'fa-sun' : 'fa-moon'}`}></i>
                        </button>

                        {/* Auth Button */}
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                to="/sign-in"
                                className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Sign In
                            </NavLink>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={toggleNav}
                            className="md:hidden p-2 rounded-md text-gray-300 hover:bg-gray-700"
                        >
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isNavOpen ? 'max-h-64 py-4' : 'max-h-0 overflow-hidden'} `}>
                    <div className="flex flex-col space-y-2">
                        <NavLink to="/" className={navLinkClass} onClick={toggleNav} end>
                            <i className="fa-regular fa-house mr-1"></i> Home
                        </NavLink>
                        <NavLink to="/product-list" className={navLinkClass} onClick={toggleNav}>
                            <i className="fa-brands fa-product-hunt mr-1"></i> Products
                        </NavLink>
                        <NavLink to="/cart" className={navLinkClass} onClick={toggleNav}>
                            <i className="fa-solid fa-cart-shopping mr-1"></i> Cart
                            {cartCount > 0 && (
                                <sup className="ml-1 px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full">
                                    {cartCount}
                                </sup>
                            )}
                        </NavLink>
                        <NavLink to="/ach" className={navLinkClass} onClick={toggleNav}>
                            <i className="fa-solid fa-info mr-1"></i> Help
                        </NavLink>
                        {!isAuthenticated ? (
                            <NavLink
                                to="/sign-in"
                                className="block px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 text-center"
                                onClick={toggleNav}
                            >
                                Sign In
                            </NavLink>
                        ) : (
                            <button
                                onClick={() => { handleLogout(); toggleNav(); }}
                                className="block px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 text-center"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>     
            </div>
        </header>
    );
    
};

export default Header;