import { createAsyncThunk } from "@reduxjs/toolkit";

const baseDeDatos = process.env.NEXT_PUBLIC_API_URL;

//fetch
export const fetchCarrousel = createAsyncThunk(
  "carrousel/fetchCarrousel",
  async (_, thunkApi) => {
    try {
      const response = await fetch(`${baseDeDatos}/carrousel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        return thunkApi.rejectWithValue(
          errorData.message || "Error al cargar las imagenes "
        );
      }
      const carrousel = await response.json();
      return carrousel;
    } catch (err) {
      if (err instanceof Error) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue("Error al cargar las imagenes");
    }
  }
);
