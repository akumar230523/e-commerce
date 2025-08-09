import { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import ProductItem from "../components/ProductItem";

import "../style/ProductList.css";

const ProductList = () => {

    const {products, loading, error} = useFetch("https://dummyjson.com/products");
    const [searchTitle, setSearchTitle] = useState("");
    const [searchCategory, setSearchCategory] = useState("all");

    // Get unique categories.
    const productCategories = useMemo(() => [
        "all", ...new Set(products.flatMap(product => product?.category))
    ], [products]);

    // Filter products based on title and category.
    const filteredProducts = products.filter(product => {
        const matchesTitle = product.title.toLowerCase().includes(searchTitle.toLowerCase());
        const matchesCategory = searchCategory === "all" || product.category.includes(searchCategory);
        return matchesTitle && matchesCategory;
    });

    if (loading) return (
        <div className="loading"> 
            <i className="fa-solid fa-spinner fa-spin-pulse"></i> 
            <p> Loading </p> 
        </div>
    );

    if (error) return (
        <div className="error"> 
            <b> Error <i className="fa-solid fa-circle-exclamation fa-fade" style={{color: "#fa3232"}}></i> </b> 
            <p> {error} </p> 
        </div>
    );

    if (!products) return <p> Product not found. </p>;

    return (
        <section className="product-list">
            <h2> Products </h2>
            {/* Search Title Input */}
            <input type="text" placeholder="Search Product.. ." value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
            {/* Search Categories Button */}
            <div className="category">
                { productCategories.map(cat => (
                    <button key={cat} className={searchCategory === cat ? "active" : ""} onClick={() => setSearchCategory(cat)}>
                        {cat}
                    </button>
                )) }
            </div>
            {/* Product Items */}
            <div className="product-items">
                { filteredProducts.length === 0 ? (
                    <p> <i> Products not found! </i> </p>
                ) : (
                    filteredProducts.map(product => ( <ProductItem key={product.id} product={product} /> ))
                ) }
            </div>
            {/*  */}
        </section>
    );

}

export default ProductList;



