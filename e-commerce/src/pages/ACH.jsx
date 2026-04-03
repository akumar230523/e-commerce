import { Link } from 'react-router-dom';

const ACH = () => {

    return (
        <section className="container mx-auto px-4 py-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">About / Contact / Help</h2>

            <div className="space-y-8">
                {/* About */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold border-b-2 border-blue-600 inline-block pb-1 mb-4">About Us</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        An e-commerce application developed using React and Tailwind CSS with real-time product data
                        from DummyJSON API. This application provides comprehensive product browsing, product search
                        and filtering, detailed product views, shopping cart functionality, and responsive design
                        experience.
                    </p>
                </div>

                {/* Contact */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold border-b-2 border-blue-600 inline-block pb-1 mb-4">Contact Us</h3>
                    <p className="italic text-gray-600 dark:text-gray-400 mb-2">
                        Have questions or feedback? We'd love to hear from you!
                    </p>
                    <p><strong>Email:</strong> support@shoppyglobe.com</p>
                    <p><strong>Phone:</strong> +91-9876543210</p>
                    <p><strong>Address:</strong> ABC-123/45 F/S, New Delhi, Delhi, India - 110045</p>
                </div>

                {/* Help */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold border-b-2 border-blue-600 inline-block pb-1 mb-4">Help!</h3>
                    <p className="italic text-gray-600 dark:text-gray-400 mb-4">
                        Need assistance? Check out our frequently asked questions below.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>How do I track my order?</li>
                        <li>What is your return policy?</li>
                        <li>How can I cancel or modify my order?</li>
                        <li>How do I contact customer support?</li>
                    </ul>
                </div>
            </div>

            <div className="text-center mt-8">
                <Link
                    to="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition"
                >
                    <i className="fa-solid fa-arrow-left mr-2"></i> Back Home
                </Link>
            </div>
        </section>
    );
    
};

export default ACH;