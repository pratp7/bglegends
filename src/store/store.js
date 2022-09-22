import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productStore/productSlice";
import cartSlice from "./cartReducers/cartSlice";
import checkoutSlice from "./checkoutReducers/checkoutSlice";
const store = configureStore({
  reducer: {
    products: productSlice,
    cartProducts: cartSlice,
    checkoutForm: checkoutSlice,
  },
});

export default store;
