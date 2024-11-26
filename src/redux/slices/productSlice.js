import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc, updateDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

// AsyncThunk para cargar productos desde Firestore
export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return products;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// AsyncThunk para crear un nuevo producto en Firestore
export const createProduct = createAsyncThunk("products/createProduct", async (productData, { rejectWithValue }) => {
  try {
    const productId = `${Date.now()}`; // ID único basado en el timestamp
    const productRef = doc(db, "products", productId);
    const newProduct = { ...productData, id: productId, createdAt: new Date().toISOString() };
    await setDoc(productRef, newProduct);
    return newProduct;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// AsyncThunk para editar un producto existente en Firestore
export const editProduct = createAsyncThunk("products/editProduct", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, { ...updatedData, updatedAt: new Date().toISOString() });
    return { id, updatedData };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Edit Product
      .addCase(editProduct.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        const index = state.items.findIndex((product) => product.id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updatedData };
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
