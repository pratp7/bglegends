import { productActions } from "./productSlice";
import { commerce } from "../../lib/commerce";
require("dotenv").config();

export const fetchData = () => {
  return async (dispatch) => {
    const fakeProducts = async () => {
      // const res = await fetch(process.env.REACT_APP_PRODUCTS_KEY);
      const { data } = await commerce.products.list();

      // if (!res.ok) {
      //   dispatch(
      //     productActions.errorHandle("Unable to fetch data Bad Response")
      //   );
      //   throw new Error("something went wrong while requesting posts");
      // }
      // const data = await res.json();
      console.log(data);
      return data;
    };

    try {
      const productsdata = await fakeProducts();
      dispatch(productActions.productinfo(productsdata || []));
      dispatch(productActions.errorHandle(" "));
    } catch (err) {
      console.log(err);
      dispatch(productActions.errorHandle("Unable to fetch data"));
    }
  };
};
