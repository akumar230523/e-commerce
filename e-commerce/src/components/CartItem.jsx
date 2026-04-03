import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { increaseQuantity, decreaseQuantity, removeProduct } from '../store/cartSlice';

const CartItem = ({ myProduct }) => {
    const { id, product, quantity } = myProduct;
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(increaseQuantity(id));
        toast.info(`Increased quantity of ${product.title}`);
    };

    const handleDecrement = () => {
        dispatch(decreaseQuantity(id));
        toast.warn(`Decreased quantity of ${product.title}`);
    };

    const handleRemove = () => {
        dispatch(removeProduct(id));
        toast.error(`${product.title} removed from cart`);
    };

    return (
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center">
            <Link to={`/product-detail/${product.id}`}>
                <img src={product.thumbnail} alt={product.title} className="w-32 h-32 object-cover rounded" />
            </Link>
            <h4 className="mt-2 font-medium text-center truncate w-full">{product.title}</h4>
            <div className="flex justify-between w-full mt-2 text-sm">
                <span>${product.price} x {quantity}</span>
                <span className="font-bold">${(product.price * quantity).toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
                <button
                    onClick={handleDecrement}
                    className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                    <i className="fa-solid fa-minus"></i>
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                    onClick={handleIncrement}
                    className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
                <button
                    onClick={handleRemove}
                    className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </article>
    );
    
};

export default CartItem;