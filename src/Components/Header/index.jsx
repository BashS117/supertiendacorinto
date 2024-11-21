import React from "react";
import './Header.css'

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-[#fff] p-4 text-white">
      {/* Logo */}
      <div className="text-lg font-bold text-yellow-400">
        <figure>
            <img
            className="w-[100px] h-[100px] rounded-lg logo"
             src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/7eb3ef213001447.673eb4aa541ed.png" alt="" 
            />
        </figure>
      </div>

      {/* Input de búsqueda */}
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Botón del carrito */}
      <button className="relative flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l3.4-6H6.6M7 13l-1.35 5.4M7 13H3M16 13l1.35 5.4M9 21a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
        <span>Carrito</span>
      </button>
    </header>
  );
};

export default Header;
