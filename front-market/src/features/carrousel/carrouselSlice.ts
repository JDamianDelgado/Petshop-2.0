import { createSlice } from "@reduxjs/toolkit";
import { fetchCarrousel } from "./thunksCarrousel";
import { initialStateCarrousel } from "./interfaceCarrousel";

const initialState: initialStateCarrousel = {
  item: [],
  error: null,
  loading: false,
  success: false,
};

const carrouselSlice = createSlice({
  name: "carrousel",
  initialState,
  reducers: {
    resetCarrousel: (state) => {
      state.item = [];
      state.error = null;
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchCarrousel.pending, (state) => {
      state.loading = true;
      state.item = [];
      state.success = false;
      state.error = null;
    });
    builder.addCase(fetchCarrousel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchCarrousel.fulfilled, (state, action) => {
      state.loading = false;
      state.item = action.payload;
      state.success = true;
    });
  },
});

const { resetCarrousel } = carrouselSlice.actions;
export const carrouselActions = {
  resetCarrousel,
};
export const carrouselReducer = carrouselSlice.reducer;
