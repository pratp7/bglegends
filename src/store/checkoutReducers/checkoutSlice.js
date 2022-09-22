import { createSlice } from "@reduxjs/toolkit";

const initialcheckoutState = {
  formData: {},
};

const checkoutSlice = createSlice({
  name: "checkoutFormDetails",
  initialState: initialcheckoutState,
  reducers: {
    checkoutFormData(state, { payload }) {
      state.formData = payload;
    },
  },
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice.reducer;
