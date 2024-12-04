import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: products, isLoading, error } = useSelector((state) => state.products);
  const rowRefs = useRef({}); // Para manejar referencias a las filas de productos

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error}</p>;
  }

  // Filtrar productos en oferta
  const offers = products.filter((product) => product.isOnSale);


  // Agrupar productos por categoría
  const groupedProducts = products.reduce((acc, product) => {
    const { category } = product;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  const handleScroll = (direction, category) => {
    const row = rowRefs.current[category];
    if (row) {
      const scrollAmount = row.offsetWidth; // Desplaza el ancho visible de la fila
      row.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Our Products</h1>
      
          {/* Sección de ofertas */}
          {offers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-red-700">Ofertas</h2>
          <div className="flex gap-4 overflow-x-auto">
            {offers.map((product) => (
              <div key={product.id} className="min-w-[200px] bg-white shadow-md rounded-lg p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
            
               <p className="text-gray-600 line-through">${product.price}</p>
               <p className="text-red-600 font-bold">${product.salePrice}</p>
            
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">{category}</h2>
          <div className="relative">
            {/* Botón izquierdo */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full z-10 hover:bg-blue-700"
              onClick={() => handleScroll("left", category)}
            >
              &lt;
            </button>
            {/* Contenedor de productos */}
            <div
              ref={(el) => (rowRefs.current[category] = el)}
              className="flex gap-4 overflow-x-auto no-scrollbar"
            >
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
                  {product.isOnSale?  <div>
               <p className="text-gray-600 line-through">${product.price}</p>
               <p className="text-red-600 font-bold">${product.salePrice}</p>
            </div>:                  <p className="text-gray-600">${product.price}</p>
 }
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            {/* Botón derecho */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full z-10 hover:bg-blue-700"
              onClick={() => handleScroll("right", category)}
            >
              &gt;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
