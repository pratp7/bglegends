import React from "react";
import clothingStore from "./clothing_store.jpg";
import clothingStore2 from "./clothing_store2.jpeg";
import classes from "./Description.module.scss";

const Description = () => {
  return (
    <>
      <figure className={classes.imageStore}>
        <img src={clothingStore} alt="store_Pic1" />
        <img
          className={classes.optionalImg}
          src={clothingStore2}
          alt="store_Pic2"
        />
      </figure>
      <section className={classes.details}>
        <h1>Our Products</h1>
        <p>
          Discover our wide range of products for all your basic needs.
          Formulated with the finest quality for the finest beings.
        </p>
      </section>
    </>
  );
};

export default Description;
