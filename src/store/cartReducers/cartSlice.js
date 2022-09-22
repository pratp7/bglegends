import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cartProducts",
  initialState: initialCartState,
  reducers: {
    cartInfo(state, action) {
      state.cartProducts = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
