import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-4">
                        <Link to="/ach" className="hover:text-blue-400 transition">About Us</Link>
                        <Link to="/ach" className="hover:text-blue-400 transition">Contact</Link>
                        <Link to="/ach" className="hover:text-blue-400 transition">Help</Link>
                    </div>
                    <div className="flex gap-4">
                        <span>Follow us:</span>
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
                <hr className="my-4 border-gray-600" />
                <div className="text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} ShoppyGlobe. All rights reserved.
                </div>
            </div>
        </footer>
    );
    
};

export default Footer;