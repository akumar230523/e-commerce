import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import "../style/ProductDetail.css";

function ProductDetail() {

    const { id } = useParams();

    const { products: product, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);

    if (loading) return <p className="loading"> Loading.. . </p>;
    if (error) return <p className="error"> Error! <br /> {error} </p>;
    if (!product) return <p> Product not found. </p>;

    return (
        <section className="product-detail">
            {/* Product Data */}
            <div className="product-data">
                <div className="product-it">     {/* Product Image and Title */}
                    <img src={product.thumbnail} alt={product.title} />
                    <figcaption> {product.title} </figcaption>
                </div>
                <div className="product-info">     {/* Product Information */}
                    <p> <b> Brand: </b> <i> {product.brand} </i> </p>
                    <p> <b> Price: </b> ${product.price} </p>
                    <p> <b> Rating: </b> {product.rating} <i className="fa-solid fa-star fa-fade" style={{ color: "#FFD43B" }}></i> </p>
                    <p> <b> Discount: </b> {product.discountPercentage}% </p>
                    <p> <b> Stock: </b> {product.stock} </p>
                    <p> <b> Availability: </b> {product.availabilityStatus || 'Not Available'} </p>
                    <p> <b> Description: </b> <i> {product.description} </i> </p>
                    <p> <b> Warranty: </b> {product.warrantyInformation || 'No warranty'} </p>
                    <p> <b> Shipping Info: </b> {product.shippingInformation || 'Not Available'} </p>
                    <p> <b> Return Policy: </b> {product.returnPolicy || 'Not Return'} </p>
                    <p> <b> Min Order Qty: </b> {product.minimumOrderQuantity || '1'} </p>
                </div>
            </div>
            {/* Product Code */}
            <div className="product-code">
                { product.meta?.qrCode && ( <img src={product.meta.qrCode} alt="QR Code" width="100" /> ) }
                <p> <i> Code: </i> {product.meta?.barcode || 'N/A'} </p>
            </div>
            {/* Customer Reviews */}
            { product.reviews?.length > 0 && (
                <section className="reviews">
                    <h3> Customer Reviews </h3>
                    { product.reviews.map((review, index) => (
                        <div className="review-data" key={index}>
                            <p> {review.rating} <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i> - <i> {review.comment} </i> </p>
                            <p> <b> {review.reviewerName} </b> <small> {review.reviewerEmail} </small> </p>
                            <p> {new Date(review.date).toLocaleDateString()} </p>
                        </div>
                    )) }
                </section>
            ) }
            {/* Back Button */}
            <Link to='/' className="back-button"> <i className="fa-solid fa-arrow-left"></i> Back Home </Link>
            {/*  */}
        </section>
    );
}

export default ProductDetail;
