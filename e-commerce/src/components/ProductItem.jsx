import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addProduct } from '../store/cartSlice';

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            toast.warn('Please sign in to add items to cart!');
            return;
        }
        dispatch(addProduct(product));
        toast.success(`${product.title} added to cart!`);
    };

    return (
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
            <Link to={`/product-detail/${product.id}`}>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{product.title}</h3>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ${product.price}
                    </span>
                    <span className="flex items-center text-yellow-500">
                        <i className="fa-solid fa-star mr-1"></i>
                        {product.rating}
                    </span>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition flex items-center justify-center gap-2"
                >
                    <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                </button>
            </div>
        </article>
    );
    
};

export default ProductItem;