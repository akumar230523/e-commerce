import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { increaseQuantity, decreaseQuantity, removeProduct } from "../store/cartSlice";

import "../style/CartItem.css";

const CartItem = ({myProduct}) => {

    const { id, product , quantity } = myProduct;

    const dispatch = useDispatch();

    // Increase quantity of product.
    const handleIncrement = () => {
        dispatch(increaseQuantity(id));
        toast.info(`Increased quantity of ${product.title}!`);
    };

    // Decrease quantity of product.
    const handleDecrement = () => {
        dispatch(decreaseQuantity(id));
        toast.warn(`Decreased quantity of ${product.title}!`);
    };

    // Remove product from cart.
    const handleRemove = () => {
        dispatch(removeProduct(id));
        toast.error(`${product.title} removed from cart!`);
    };

    return (
        <article className="cart-item">
            <h4> {product.title} </h4>
            <Link to={`/product-detail/${product.id}`}> <img src={product.thumbnail} alt={product.title} />
            </Link>
            <div className="pq">
                <p> Price: ${product.price} x {quantity} </p>
                <p> = ${ (product.price * quantity).toFixed(2) } </p>
            </div>
            <div className="qty-control">
                <button onClick={handleDecrement}> <i className="fa-solid fa-minus"></i> </button>
                <span> {quantity} </span>
                <button onClick={handleIncrement}> <i className="fa-solid fa-plus"></i> </button>
                <button className="remove-btn" onClick={handleRemove}> <i className="fa-solid fa-trash"></i> </button>
            </div>
        </article>
    );

}

export default CartItem;


