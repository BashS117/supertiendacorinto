import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const UserDropdown = () => {
    const dispatch = useDispatch()
    const handleLogout= async ()=>{
        try{
            await signOut(auth);
            localStorage.removeItem('users');
            dispatch(logout())
        }catch (error) {
            console.error("Error al cerrar sesión:", error.message);
          }
    }
  return (
    <div className="absolute right-4 top-16 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Encabezado */}
      <div className="flex items-center p-4 border-b border-gray-300">
        <img
          src="https://via.placeholder.com/40" // Imagen de perfil (puedes reemplazarla con una URL dinámica)
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-3">
          <p className="font-medium text-gray-800">Sebastian Rodriguez</p>
          <p className="text-sm text-blue-600">Facebook</p>
        </div>
        <button
          className="ml-auto text-gray-600 hover:text-gray-800"
          aria-label="Config"
        >
          <i className="fas fa-cog"></i>
        </button>
      </div>

      {/* Opciones */}
      <div className="p-4 text-black">
        <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition">
          <p className="fas fa-box mr-2 text-blue-600"></p>
          Productos
        </button>
        <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition mt-2">
          <p className="fas fa-clipboard-list mr-2 text-green-600"></p>
          Pedidos
        </button>
      </div>

      {/* Cerrar sesión */}
      <div className="p-4 border-t border-gray-300">
        <button
        onClick={handleLogout}
         className="w-full text-left py-2 px-3 text-red-500 hover:bg-gray-100 rounded-lg transition">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
