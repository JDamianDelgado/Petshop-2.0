import { createAsyncThunk } from "@reduxjs/toolkit";
import { newProduct, updateProduct } from "./interfaceProduct";
const baseDeDatos = process.env.NEXT_PUBLIC_API_URL;

//Get all products
export const fetchProducts = createAsyncThunk(
  "product/viewAllProducts",
  async (_, thunkApi) => {
    try {
      const response = await fetch(`${baseDeDatos}/product`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(
          errorData.message || "Error al cargar los productos"
        );
      }
      const products = await response.json();
      return products;
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Error al cargar los datos ");
    }
  }
);

//Get product
export const viewProduct = createAsyncThunk(
  "product/viewProduct",
  async (idProduct: string, thunkApi) => {
    try {
      const response = await fetch(`${baseDeDatos}/product/${idProduct}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(
          errorData.message || "Error al cargar el producto"
        );
      }
      const product = await response.json();
      return product;
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Error al cargar los datos ");
    }
  }
);

//delete product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (idProduct, thunkApi) => {
    try {
      const response = await fetch(`${baseDeDatos}/product/${idProduct}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(
          errorData.message || "Error al eliminar producto"
        );
      }
      const products = await response.json();
      return products;
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Error al eliminar el producto ");
    }
  }
);

//crear nuevo producto
export const createProduct = createAsyncThunk(
  "products/newProduct",
  async (productData: newProduct, thunkApi) => {
    try {
      const response = await fetch(`${baseDeDatos}/product/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(
          errorData.message || "Error al crear el producto"
        );
      }
      const products = await response.json();
      return products;
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Error al cargar los datos ");
    }
  }
);

//editar el producto
export const editProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    {
      idProduct,
      productData,
    }: { idProduct: string; productData: updateProduct },
    thunkApi
  ) => {
    try {
      const response = await fetch(`${baseDeDatos}/product/${idProduct}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(
          errorData.message || "No se pudo modificar producto"
        );
      }
      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Error al editar el producto");
    }
  }
);
