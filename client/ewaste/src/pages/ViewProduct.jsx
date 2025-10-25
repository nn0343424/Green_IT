import React, { useState, useEffect } from "react";

const ViewProducts = () => {
    // State for storing fetched items
    const [products, setProducts] = useState([]);
    // State for handling loading status
    const [loading, setLoading] = useState(true);
    // State for handling errors
    const [error, setError] = useState(null);

    // NEW PLACEHOLDER: Explicit "No Image" placeholder
    const PLACEHOLDER_IMAGE = "https://via.placeholder.com/400x250?text=E-Waste+No+Image";

    // Function to fetch data from the server
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Use the correct API endpoint
                const response = await fetch("http://localhost:5000/api/items"); 
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setProducts(data); // Set the fetched data to state
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load products. Please check the server connection and ensure it is running.");
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchProducts();
    }, []); // Empty dependency array ensures this runs only once on component mount

    // Displaying Loading/Error status
    if (loading) {
        return (
            <div className="text-center py-12 text-lg text-green-700">
                Loading E-Waste Items...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-xl text-red-600">
                Error: {error}
            </div>
        );
    }
    
    // Check if no products are available
    if (products.length === 0) {
        return (
            <div className="text-center py-12 text-xl text-gray-500">
                No E-Waste products are currently listed.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-12 px-6">
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
                Available E-Waste Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        // Use _id from MongoDB for the unique key
                        key={product._id} 
                        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
                    >
                        {/* Image Display with Base64 validation */}
                        <img
                            src={
                                product.image && product.image.startsWith('data:image/') 
                                    ? product.image 
                                    : PLACEHOLDER_IMAGE
                            } 
                            alt={product.product} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5 text-left">
                            {/* Using product.product as the main title */}
                            <h3 className="text-xl font-semibold text-green-700 mb-2">
                                {product.product} 
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                                <span className="font-semibold">Condition:</span>{" "}
                                {product.condition}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <span className="font-semibold">Location:</span>{" "}
                                {product.location}
                            </p>
                            {/* Use product.message as the description */}
                            <p className="text-gray-700 mt-2 text-sm">{product.message}</p>
                            
                            {/* ✅ FUNCTIONAL BUTTON: mailto link */}
                            <a 
                                href={`mailto:${product.email}?subject=Request for E-Waste Pickup: ${product.product} (${product.location})&body=Hello ${product.name},%0A%0AI am interested in requesting a pickup for your ${product.product} (Condition: ${product.condition}, Location: ${product.location}).%0A%0AWhen would be a good time to arrange the pickup?%0A%0AThank you,%0A[Your Name]`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full inline-block text-center font-medium"
                            >
                                Request Via mail
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewProducts;