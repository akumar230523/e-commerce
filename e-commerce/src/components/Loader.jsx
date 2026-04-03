const Loader = () => {
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
            <i className="fa-solid fa-spinner fa-spin-pulse text-4xl text-blue-600"></i>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
    );

};

export default Loader;