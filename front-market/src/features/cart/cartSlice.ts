import { createSlice } from "@reduxjs/toolkit";
import {
  removeProduct,
  deleteCart,
  fetchCartProducts,
  addProduct,
} from "./thunksCart";
import { CartState, Product } from "./interfaceCart";

//carrito
const cartViewSlice = createSlice({
  name: "cart",
  initialState: { isOpen: false },
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// estados reutilizable
const setPending = (state: CartState) => {
  state.loading = true;
  state.status = "Pendiente";
};
const setFullFilled = (state: CartState, cart: Product[]) => {
  state.loading = false;
  state.status = "Activo";
  state.cart = cart;
};
const setError = (state: CartState, error: string) => {
  state.loading = false;
  state.error = error;
  state.status = "Fallido";
};

//productos de carrito, eliminar carrito , eliminar producto
const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
  status: "Inactivo",
};
const cartProductSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = [];
      state.loading = false;
      state.status = "Inactivo";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchCartProducts.pending, (state) => {
      setPending(state);
    });
    builder.addCase(fetchCartProducts.fulfilled, (state, action) => {
      setFullFilled(state, action.payload);
    });
    builder.addCase(fetchCartProducts.rejected, (state, action) => {
      setError(state, action.payload as string);
    });

    //delete cart
    builder.addCase(deleteCart.fulfilled, (state) => {
      setFullFilled(state, []);
    });
    builder.addCase(deleteCart.rejected, (state, action) => {
      setError(state, action.payload as string);
    });
    builder.addCase(deleteCart.pending, (state) => {
      setPending(state);
    });

    //remove product
    builder.addCase(removeProduct.pending, (state) => {
      setPending(state);
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      setFullFilled(state, action.payload);
    });
    builder.addCase(removeProduct.rejected, (state, action) => {
      setError(state, action.payload as string);
    });

    //add product Cart
    builder.addCase(addProduct.rejected, (state, action) => {
      setError(state, action.payload as string);
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      setFullFilled(state, action.payload);
    });
    builder.addCase(addProduct.pending, (state) => {
      setPending(state);
    });
  },
});
const { openCart, closeCart, toggleCart } = cartViewSlice.actions;
const { resetCartState } = cartProductSlice.actions;

export const cartProductReducer = cartProductSlice.reducer;
export const cartViewReducer = cartViewSlice.reducer;

export const cartActions = {
  openCart,
  closeCart,
  toggleCart,
  resetCartState,
};
