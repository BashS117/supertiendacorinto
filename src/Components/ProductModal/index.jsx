import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct, editProduct } from "../../redux/slices/productSlice";

const ProductModal = ({ isOpen, onClose, product }) => {
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
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    isOnSale: false,
    salePrice: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      setFormValues({
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category,
        isOnSale: product?.isOnSale || false,
        salePrice: product?.salePrice || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

     // Validar datos antes de enviar
     if (formValues.isOnSale && (!formValues.salePrice || formValues.salePrice <= 0)) {
      alert("Por favor, ingresa un precio válido para la oferta.");
      return;
    }

    const productData = {
      name: formValues.name,
      price: parseFloat(formValues.price),
      stock: parseInt(formValues.stock),
      category: formValues.category,
      isOnSale: formValues.isOnSale,
      salePrice:  parseFloat(formValues.salePrice),
    };

    try {
      if (product) {
        // Editar producto existente
        await dispatch(editProduct({ id: product.id, updatedData: productData })).unwrap();
      } else {
        // Crear un nuevo producto
        await dispatch(createProduct(productData)).unwrap();
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Hubo un error al guardar el producto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          {product ? "Editar Producto" : "Añadir Producto"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre del Producto
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formValues.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
          <label className=" text-gray-700 flex items-center gap-2">
            <input
              type="checkbox"
              name="isOnSale" 
              checked={formValues.isOnSale}
              onChange={handleChange}
            />
            ¿Producto en oferta?
          </label>
        </div>
        {formValues.isOnSale && (
          <div className="mb-4">
            <label className="block text-gray-700">Precio de Oferta</label>
            <input
              type="number"
              name="salePrice"
              value={formValues.salePrice}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
        )}
          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formValues.stock}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

         {/* Category Dropdown */}
         <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formValues.category}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : product ? "Guardar Cambios" : "Añadir Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
