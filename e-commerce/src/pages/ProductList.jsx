import { useState, useMemo } from 'react';
import useFetch from '../hooks/useFetch';
import ProductItem from '../components/ProductItem';

const ProductList = () => {
    const { data, loading, error } = useFetch('https://dummyjson.com/products');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Get unique categories from data
    const categories = useMemo(() => {
        const products = data?.products || [];
        const cats = products.map((p) => p.category);
        return ['all', ...new Set(cats)];
    }, [data]);

    // Filter products based on search and category
    const filteredProducts = useMemo(() => {
        const products = data?.products || [];
        return products.filter((product) => {
            const matchesTitle = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesTitle && matchesCategory;
        });
    }, [data, searchTerm, selectedCategory]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <i className="fa-solid fa-spinner fa-spin-pulse text-4xl text-blue-600"></i>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
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

    return (
        <section className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Products</h2>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
            </div>

            {/* Category Filters */}
            <div className="overflow-x-auto whitespace-nowrap py-2 mb-8 scrollbar-thin">
                <div className="inline-flex gap-2 px-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap flex-shrink-0 ${selectedCategory === cat
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
    
};

export default ProductList;