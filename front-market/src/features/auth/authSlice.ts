import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface userState {
  user: null | { id: string; email: string; rol: string };
  loading: boolean;
  error: string | null;
}

interface DecodedToken {
  id: string;
  email: string;
  rol: string;
  iat?: number;
  exp?: number;
}

const initialState: userState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const baseDeDatos = process.env.NEXT_PUBLIC_API_URL;
      const { email, password } = credentials;
      const response = await fetch(`${baseDeDatos}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(
          errorData.message || "Error al iniciar sesion"
        );
      }
      const { token } = await response.json();

      const userData: DecodedToken = jwtDecode(token);

      localStorage.setItem("token", token);

      return userData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Error al iniciar sesion"
      );
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

//REGISTRO DE USUARIO
interface interfaceRegister {
  name: string;
  password: string;
  email: string;
  age: number;
}

const initialStateRegister: {
  user: interfaceRegister | null;
  loading: boolean;
  error: string | null;
} = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    data: { name: string; email: string; password: string; age: number },
    thunkAPI
  ) => {
    try {
      const baseDeDatos = process.env.NEXT_PUBLIC_API_URL;
      const { name, email, password, age } = data;
      const response = await fetch(`${baseDeDatos}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          age,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(
          errorData.message || "Error al cargar los datos"
        );
      }

      const register = await response.json();
      return register;
    } catch (err) {
      return thunkAPI.rejectWithValue(err || "Error al registrar");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: initialStateRegister,
  reducers: {
    clearRegisterState(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const loginReducer = loginSlice.reducer;
export const registerReducer = registerSlice.reducer;
const { clearRegisterState } = registerSlice.actions;
const { logout } = loginSlice.actions;

export const authActions = {
  logout,
  clearRegisterState,
};
