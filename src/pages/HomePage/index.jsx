import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: products, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error}</p>;
  }

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const { category } = product;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Our Products
      </h1>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">{category}</h2>
          <div className="flex gap-4 overflow-x-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[200px] bg-white shadow-md rounded-lg p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
