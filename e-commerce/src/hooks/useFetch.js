import { useEffect, useState } from "react";

function useFetch(api) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(api);
                const result = await response.json();
                if (result.products) {
                    setProducts(result.products);
                } 
                else {
                    setProducts(result);
                }
            } 
            catch (error) {
                setError("Failed to fetch products!");
                console.error(error);
            } 
            finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [api]);
    return { products, loading, error };

}

export default useFetch;