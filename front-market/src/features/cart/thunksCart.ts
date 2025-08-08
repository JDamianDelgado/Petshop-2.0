import { createAsyncThunk } from "@reduxjs/toolkit";
const baseDeDatos = process.env.NEXT_PUBLIC_API_URL;

//fetch carrito
export const fetchCartProducts = createAsyncThunk(
  "cart/fetchProducts",
  async (idUser: string, thunkApi) => {
    try {
      const response = await fetch(`${baseDeDatos}/cart/myCart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          user: idUser,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(
          errorData.message || "Error al cargar productos"
        );
      }

      const cart = await response.json();
      return cart;
    } catch (err) {
      if (err instanceof Error) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue("Error al cargar productos");
    }
  }
);

//delete carrito
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (idUser: string, thunkApi) => {
    try {
      const response = await fetch(`${baseDeDatos}/cart/deleteCart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          user: idUser,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(
          errorData.message || "Error al eliminar carrito"
        );
      }

      const data = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue("Error al eliminar el carrito");
    }
  }
);

//eliminar producto de carrito
export const removeProduct = createAsyncThunk(
  "cart/removeProduct",
  async (
    { idUser, idProduct }: { idUser: string; idProduct: string },
    thunkApi
  ) => {
    try {
      const response = await fetch(`${baseDeDatos}/cart/removeProduct`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          user: idUser,
        },
        body: JSON.stringify({ product: idProduct }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(
          errorData.message || "Error al eliminar producto"
        );
      }

      const result = await response.json();
      return result;
    } catch (err) {
      if (err instanceof Error) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue("Error al eliminar producto");
    }
  }
);

export const addProduct = createAsyncThunk(
  "cart/addProduct",
  async (
    {
      idUser,
      idProduct,
      quantity,
    }: { idUser: string; idProduct: string; quantity: number },
    thunkApi
  ) => {
    try {
      const response = await fetch(`${baseDeDatos}/product/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          user: idUser,
        },
        body: JSON.stringify({ product: idProduct, quantity: quantity }),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(
          errorData.message || "Error al agregar producto"
        );
      }
      const result = await response.json();
      return result;
    } catch (err) {
      if (err instanceof Error) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue("Error desconocido al agregar producto");
    }
  }
);
