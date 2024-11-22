import React from "react";
import './Header.css'

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-blue-700 p-4 text-white">
      {/* Logo */}
      <div className="text-lg font-bold text-yellow-400">
        <figure>
          <img
            className="w-[100px] h-[100px] rounded-lg logo"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/7eb3ef213001447.673eb4aa541ed.png"
            alt=""
          />
        </figure>
      </div>

      <div className="flex items-center w-full max-w-2xl  rounded-lg overflow-hidden shadow-md">
        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="¿Qué está buscando?"
          className="flex-grow px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none"
        />

        {/* Botón de búsqueda */}
        <button className="flex items-center justify-center bg-red-500 text-white px-4 rounded-l-[0px]">
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
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </button>
      </div>
      <div className="flex text-start items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>

        <div>
          <p>¡Hola!</p>
          <p className="font-bold">Inicia sesión o regístrate</p>
        </div>
      </div>

      {/* Botón del carrito */}
      <button className="relative flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>

        <span>Carrito</span>
      </button>
    </header>
  );
};

export default Header;
