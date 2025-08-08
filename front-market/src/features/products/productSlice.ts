import { createSlice } from "@reduxjs/toolkit";
import { Product, ProductState } from "./interfaceProduct";
import {
  createProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
  viewProduct,
} from "./thunksProduct";

//estados reutilizables
const setPending = (state: ProductState) => {
  state.loading = true;
  state.status = "Pendiente";
};
const setFulfilled = (state: ProductState, products: Product[]) => {
  state.loading = false;
  state.status = "Activo";
  state.products = products;
};
const setError = (state: ProductState, error: string) => {
  state.loading = false;
  state.status = "Fallido";
  state.error = error;
};

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  status: "Inactivo",
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.selectedProduct = null;
      state.loading = false;
      state.error = null;
      state.status = "Inactivo";
    },
  },
  extraReducers: (builder) => {
    //allProducts
    builder.addCase(fetchProducts.pending, (state) => {
      setPending(state);
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      setFulfilled(state, action.payload);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      setError(state, action.payload as string);
    });

    //viewProduct
    builder.addCase(viewProduct.pending, (state) => {
      setPending(state);
    });
    builder.addCase(viewProduct.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
      state.status = "Activo";
      state.loading = false;
    });
    builder.addCase(viewProduct.rejected, (state, action) => {
      setError(state, action.payload as string);
    });

    //deleteProduct
    builder.addCase(deleteProduct.pending, (state) => {
      setPending(state);
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      setFulfilled(state, action.payload);
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      setError(state, action.payload as string);
    });

    //create product
    builder.addCase(createProduct.pending, (state) => {
      setPending(state);
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "Activo";
      const newProduct = action.payload as Product;
      state.selectedProduct = newProduct;
      state.products.push(newProduct);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      setError(state, action.payload as string);
    });

    //update Product
    builder.addCase(editProduct.pending, (state) => {
      setPending(state);
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
      state.loading = false;
      state.status = "Activo";
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      setError(state, action.payload as string);
    });
  },
});

export const { resetProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;
