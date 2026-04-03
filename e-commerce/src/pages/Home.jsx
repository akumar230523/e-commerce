import { Link } from 'react-router-dom';

const Home = () => {
    
    return (
        <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
            {/* Background logo with shadow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img
                    src="/ShoppyGlobe.png"
                    alt="ShoppyGlobe Logo"
                    className="w-[75%] max-w-[600px] opacity-10 blur-sm drop-shadow-2xl"
                    style={{ transform: 'scale(1.2)' }}
                />
            </div>

            {/* Foreground content */}
            <div className="relative z-10 text-center px-4 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">ShoppyGlobe</h1>
                <hr className="w-24 h-1 bg-yellow-500 mx-auto my-6 rounded" />
                <p className="text-xl md:text-2xl font-light italic">Your Global Destination for Online Shopping.</p>
                <Link
                    to="/product-list"
                    className="inline-block mt-8 px-8 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-yellow-400 transition transform hover:scale-105"
                >
                    Shop Now
                </Link>

                {/* Social icons */}
                <div className="flex justify-center gap-6 mt-12 text-2xl">
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                        <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-500 transition"
                    >
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a
                        href="https://telegram.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition"
                    >
                        <i className="fa-brands fa-telegram"></i>
                    </a>
                    <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-600 transition"
                    >
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                </div>
            </div>
        </section>
    );

};

export default Home;