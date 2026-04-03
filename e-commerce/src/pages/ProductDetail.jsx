import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';
import { addProduct } from '../store/cartSlice';

const ProductDetail = () => {
    const { id } = useParams();
    const { data: product, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <i className="fa-solid fa-spinner fa-spin-pulse text-4xl text-blue-600"></i>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading product details...</p>
            </div>
        );
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <i className="fa-solid fa-circle-exclamation fa-fade text-4xl text-red-500"></i>
                <p className="mt-4 text-red-600">Error: {error}</p>
            </div>
        );
    };

    if (!product) {
        return <p className="text-center text-gray-500 dark:text-gray-400">Product not found.</p>;
    };

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 p-6 flex flex-col items-center">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full max-w-md rounded-lg shadow-md"
                        />
                        <h2 className="mt-4 text-2xl font-bold text-center">{product.title}</h2>
                    </div>
                    <div className="md:w-1/2 p-6 space-y-4">
                        <p><span className="font-semibold">Brand:</span> {product.brand}</p>
                        <p><span className="font-semibold">Price:</span> ${product.price}</p>
                        <p>
                            <span className="font-semibold">Rating:</span> {product.rating}{' '}
                            <i className="fa-solid fa-star text-yellow-500"></i>
                        </p>
                        <p><span className="font-semibold">Discount:</span> {product.discountPercentage}%</p>
                        <p><span className="font-semibold">Stock:</span> {product.stock}</p>
                        <p><span className="font-semibold">Availability:</span> {product.availabilityStatus || 'N/A'}</p>
                        <p><span className="font-semibold">Description:</span> {product.description}</p>
                        <p><span className="font-semibold">Warranty:</span> {product.warrantyInformation || 'No warranty'}</p>
                        <p><span className="font-semibold">Shipping:</span> {product.shippingInformation || 'N/A'}</p>
                        <p><span className="font-semibold">Return Policy:</span> {product.returnPolicy || 'N/A'}</p>
                        <p><span className="font-semibold">Min Order Qty:</span> {product.minimumOrderQuantity || 1}</p>

                        {/* Add to Cart Button - only for authenticated users */}
                        {isAuthenticated && (
                            <button
                                onClick={handleAddToCart}
                                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition flex items-center justify-center gap-2"
                            >
                                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                            </button>
                        )}
                    </div>
                </div>

                {product.reviews?.length > 0 && (
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                        <div className="space-y-4">
                            {product.reviews.map((review, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <p className="flex items-center gap-1">
                                        <span className="font-semibold">{review.rating}</span>
                                        <i className="fa-solid fa-star text-yellow-500"></i>
                                        <span className="ml-2 italic">"{review.comment}"</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        <strong>{review.reviewerName}</strong> ({review.reviewerEmail})
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        {new Date(review.date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="text-center mt-8">
                <Link
                    to="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition"
                >
                    <i className="fa-solid fa-arrow-left mr-2"></i> Back to Home
                </Link>
            </div>
        </section>
    );
    
};

export default ProductDetail;