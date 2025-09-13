import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addProduct } from "../store/cartSlice";

import "../style/ProductItem.css";

const ProductItem = ({product}) => {

    const dispatch = useDispatch();

    // Add product to cart.
    const handleAdd = () => {
        dispatch(addProduct(product));
        toast.info(`${product.title} added to cart!`);
    };

    return (
        <article className="product-item">
            <h4> {product.title} </h4>
            <Link to={`/product-detail/${product.id}`}> <img src={product.thumbnail} alt={product.title} /> </Link>
            <div className="pr">
                <p> Price: ${product.price} </p>
                <p> {product.rating} <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i> </p>
            </div>
            <button className="add-btn" onClick={handleAdd}> <i className="fa-solid fa-cart-shopping fa-sm"></i> Add to Cart </button>
        </article>
    );
    
}

export default ProductItem;


