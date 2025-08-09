import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Theme from "../context/Theme";

import "../style/Header.css";

const Header = () => {

    const {isTheme, setIsTheme} = useContext(Theme);
    const [isNav, setIsNav] = useState(false);

    const cartCount = useSelector((state) => state.cart.cartitems.length);

    // Toggles dark/light Theme
    const handleTheme = () => setIsTheme((prev) => !prev);

    // Toggle mobile nav menu
    const handleNav = () => setIsNav((prev) => !prev);

    return (
        <header>
            <h1> <img src="ShoppyGlobe.png" alt="" /> <NavLink to='/'> ShoppyGlobe </NavLink> </h1>
            <nav className={` ${isNav ? 'open' : ''} `}>
                <NavLink  to="/" className="nav"> <i className="fa-regular fa-house"></i> Home </NavLink>
                <NavLink  to="/product-list" className="nav"> <i className="fa-brands fa-product-hunt"></i> Products </NavLink>
                <NavLink  to="/cart" className="nav"> 
                    <i className="fa-solid fa-cart-shopping"></i> MyCart {cartCount > 0 && <sup> {cartCount} </sup>} 
                </NavLink>
                <NavLink  to="/sign-in" className="nav"> <i className="fa-regular fa-circle-user"></i> SignIn </NavLink>
                <NavLink  to="/ach" className="nav"> <i className="fa-solid fa-info"></i> Help </NavLink>
            </nav>
            <div className="h-btn">
                <button onClick={handleTheme}> <i className={` fa-solid ${isTheme ? 'fa-sun' : 'fa-moon'} `}></i> </button>
                <button id="bars" onClick={handleNav}> <i className="fa-solid fa-bars"></i> </button>
            </div>
        </header>
    );
    
}

export default Header;


