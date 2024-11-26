import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword,signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc,getDoc } from "firebase/firestore"; // Importar funciones de Firestore
import { auth,db } from "../../firebase/firebase.js";

// Thunk para manejar la autenticación
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
       // Lee el rol del usuario desde Firestore
       const docRef = doc(db, "users", user.uid);
       const docSnap = await getDoc(docRef);
 
       if (!docSnap.exists()) {
         throw new Error("El usuario no tiene datos en Firestore");
       }
 
       const userData = docSnap.data();
      
      // return userCredential.user; // Devuelve la información del usuario
console.log(userData.role)
localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email, role: userData.role }));

     // Retorna los datos del usuario incluyendo el rol
      return { uid: user.uid, email: user.email, role: userData.role };
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
        
        //Crear el usuario en fb auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { uid, email: userEmail,role } = userCredential.user;

        // Guardar la información del usuario en Firestore con el rol 'cliente'
      await setDoc(doc(db, "users", uid), {
        email: email,
        role: "cliente", // Asignar rol por defecto
        createdAt: new Date().toISOString(),
      });

        // return userCredential.user; // Devuelve la información del usuario registrado
              // Solo retornamos los datos relevantes
      return { uid, email: userEmail,role }; // Esto es serializable
      } catch (error) {
        return rejectWithValue(error.message); // Maneja errores
      }
    }
  );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
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
        localStorage.setItem("user", JSON.stringify(action.payload));
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
