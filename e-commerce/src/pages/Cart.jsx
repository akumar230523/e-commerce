import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartitems);

    return (
        <section className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">My Cart</h2>

            {cartItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
                    <Link
                        to="/product-list"
                        className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} myProduct={item} />
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link
                            to="/checkout"
                            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full transition"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </>
            )}
        </section>
    );

};

export default Cart;
