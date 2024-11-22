import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";

// Thunk para manejar la autenticación
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user; // Devuelve la información del usuario
    } catch (error) {
      return rejectWithValue(error.message); // Maneja errores
    }
  }
);

// Thunk para registrar usuarios
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // return userCredential.user; // Devuelve la información del usuario registrado
              // Solo retornamos los datos relevantes
      const { uid, email: userEmail } = userCredential.user;
      return { uid, email: userEmail }; // Esto es serializable
      } catch (error) {
        return rejectWithValue(error.message); // Maneja errores
      }
    }
  );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;// `payload` ahora es serializable
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
