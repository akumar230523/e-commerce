import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "../style/Checkout.css";

const Checkout = () => {
    
    const cartItems = useSelector((state) => state.cart.cartitems);

    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);

    const placeOrder = () => {
        if (cartItems.length === 0) {
            toast.warn("Your cart is empty!");
            return;
        }
        toast.success("Order placed successfully!");
    }

    return (
        <section className="checkout">
            <div className="co-summary">
                <h2> CheckOut </h2>
                <hr />
                { cartItems.length === 0 ? ( 
                    <p> No items in cart. </p>
                ) : (
                    <ul>
                        { cartItems.map((item) => (
                            <li key={item.id}>
                                <p> {item.product.title} x {item.quantity} = <b> ${ (item.product.price * item.quantity).toFixed(2) } </b> </p> 
                            </li>
                        )) }
                    </ul>
                ) }
                <h5> Total: ${total} </h5>
                <button className="co-btn" onClick={placeOrder}> Place Order </button>
                <hr />
                <Link to='/cart' className="co-btn"> <i className="fa-solid fa-arrow-left"></i> Back </Link>
            </div>
        </section>
    );

}
export default Checkout;



