import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";

import "../style/Cart.css";

const Cart = () => {

    const cartItems = useSelector((state) => state.cart.cartitems);

    return (
        <section className="cart">
            <h2> My Cart </h2>
            {/* Card Items */}
            <div className="cart-items">
                { cartItems.length === 0 ? (
                    <p> <i> Your cart is empty. </i> </p>
                ) : (
                    cartItems.map((myProduct) => ( <CartItem key={myProduct.id} myProduct={myProduct} /> ))
                ) }
            </div>
            {/* Checkout Button */}
            <Link to="/checkout" className="checkout-btn"> Checkout <i className="fa-solid fa-cart-shopping fa-fade"></i> </Link>
            {/*  */}
        </section>
    );

}

export default Cart;