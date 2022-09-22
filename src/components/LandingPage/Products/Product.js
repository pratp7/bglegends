import React, { useState, useEffect } from "react";
import classes from "./Product.module.scss";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../../store/productStore/productThunk";
import parse from "html-react-parser";
import { fetchCart, addCart } from "../../../store/cartReducers/cartThunk";

const Product = () => {
  const products = useSelector((state) => state.products.itemDetails);
  const error = useSelector((state) => state.products.productError);
  const dispatch = useDispatch();
  const [currentItems, setCurrentItems] = useState(null);
  const itemsPerPage = 9;
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const clickHandler = async (itemID, quantity) => {
    dispatch(addCart(itemID, quantity));
  };

  //fetching useEffect
  useEffect(() => {
    setLoading(true);
    dispatch(fetchData());
    dispatch(fetchCart());

    if (error) {
      setErr(error);
    }
  }, [dispatch, error]);

  //pagination useEffect
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
    setLoading(false);
  }, [itemOffset, itemsPerPage, products]);

  const displayProducts =
    currentItems &&
    currentItems.map((item) => (
      <article key={item.id}>
        <figure>
          <img src={item.image.url} alt={item.name} />
        </figure>
        <h3>{item.name}</h3>
        <p>{item.price.formatted_with_symbol}</p>
        {parse(`${item.description}`)}
        <div>
          <button onClick={() => clickHandler(item.id, 1)}>Add to Cart</button>
        </div>
      </article>
    ));
  //pagination buttons click change
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  //JSX
  return (
    <section className={classes.products}>
      {loading && <h3>Fetching Products....</h3>}
      {!loading && displayProducts}
      {err && <div className={classes.error}>{err}</div>}
      {!loading && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName={classes.paginationBttns}
          previousLinkClassName={classes.previousBttn}
          nextLinkClassName={classes.nextBttn}
          disabledClassName={classes.paginationDisabled}
          activeClassName={classes.paginationActive}
        />
      )}
    </section>
  );
};

export default React.memo(Product);

//without thunk and redux

// const fakeProducts = async () => {
//   const res = await fetch(process.env.REACT_APP_PRODUCTS_KEY);
//   if (!res.ok) {
//     throw new Error("something went wrong while requesting posts");
//   }
//   const data = await res.json();
//   console.log(data);
//   setProducts(data);
// };

// useEffect(() => {
//   try {
//     fakeProducts();
//   } catch (err) {
//     throw new Error("Unable to fetch Products", err);
//   }
// }, []);
