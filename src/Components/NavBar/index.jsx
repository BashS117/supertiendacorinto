import React, { useState } from "react";

const NavBar = () => {
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    "Despensa",
    "Lácteos, huevos y refrigerados",
    "Dulces y postres",
    "Vinos y licores",
    "Bebidas",
    "Aseo del hogar",
    "Cuidado personal",
    "Limpieza de cocina",
  ];

  return (
    <div className="flex items-center gap-4 p-4 bg-blue-900">
      {/* Botón Todas las Categorías */}
      <div className="relative">
        <button
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          onClick={() => setShowCategories(!showCategories)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          Todas las categorías
          <span className="ml-1">▼</span>
        </button>
        {showCategories && (
          <ul className="absolute top-12 left-0 bg-white border rounded-lg shadow-md w-56">
            {categories.map((category, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer"
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Botón Ofertas */}
      <button className="flex items-center gap-2 bg-yellow-300 text-black px-4 py-2 rounded-lg hover:bg-yellow-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 7.5l3 2.25L12 14.5l-3-2.25L12 9.5z"
          />
        </svg>
        Ofertas
        <span className="ml-1">▼</span>
      </button>
    </div>
  );
};

export default NavBar;
