import { createSlice } from "@reduxjs/toolkit";
const initialProductState = {
  itemDetails: [],
  productError: "",
};

const productSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    productinfo(state, action) {
      state.itemDetails = action.payload;
    },
    errorHandle(state, action) {
      state.productError = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
