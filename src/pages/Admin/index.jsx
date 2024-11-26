import React, { useState, useEffect } from "react";
import ProductModal from "../../Components/ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice"; 
const AdminProductsPage = () => {
    const dispatch = useDispatch();
    const { items: products, isLoading, error } = useSelector((state) => state.products);
console.log(products)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts()); // Despacha la acción al cargar la página
  }, [dispatch]);

  const handleAddProduct = (product) => {
    const newProduct = { id: Date.now(), ...product }; // Genera un ID único
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editingProduct.id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleModalSubmit = (formValues) => {
    if (editingProduct) {
      handleEditProduct(formValues);
    } else {
      handleAddProduct(formValues);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Administrar Productos
      </h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Agregar Producto
        </button>
      </div>

      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Precio</th>
            <th className="py-2 px-4 text-left">Stock</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product,index) => (
            <tr
              key={product.id}
              className="border-b hover:bg-gray-100 transition"
            >
              <td className="py-2 px-4">{product.id}</td>
              <td className="py-2 px-4">{index+1}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">${product.price}</td>
              <td className="py-2 px-4">{product.stock}</td>
              <td className="py-2 px-4 flex gap-2">
                <button
                  onClick={() => openEditModal(product)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  Editar
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        product={editingProduct}
      />
    </div>
  );
};

export default AdminProductsPage;
