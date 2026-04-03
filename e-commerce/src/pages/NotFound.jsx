import { Link, useRouteError } from 'react-router-dom';

const NotFound = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
            <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {error?.statusText || 'Page not found'}
            </p>
            <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition"
            >
                Go Home
            </Link>
        </div>
    );
    
};

export default NotFound;