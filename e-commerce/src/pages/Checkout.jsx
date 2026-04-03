import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCart } from '../store/cartSlice';

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.cartitems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const total = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    ).toFixed(2);

    const placeOrder = () => {
        if (cartItems.length === 0) {
            toast.warn('Your cart is empty!');
            return;
        }
        dispatch(clearCart());
        toast.success('Order placed successfully!');
        navigate('/');
    };

    return (
        <section className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>

                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">No items in cart.</p>
                ) : (
                    <>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {cartItems.map((item) => (
                                <li key={item.id} className="py-4 flex justify-between">
                                    <span>
                                        {item.product.title} x {item.quantity}
                                    </span>
                                    <span className="font-semibold">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-right">
                            <p className="text-xl font-bold">Total: ${total}</p>
                        </div>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={placeOrder}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition"
                            >
                                Place Order
                            </button>
                            <Link
                                to="/cart"
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-full transition text-center"
                            >
                                Back to Cart
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
    
};

export default Checkout;