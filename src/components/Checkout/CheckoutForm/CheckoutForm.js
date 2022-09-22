import React, { useEffect, useState } from "react";
import classes from "./CheckoutForm.module.scss";
import { useNavigate } from "react-router";
import { commerce } from "../../../lib/commerce";
import { useSelector, useDispatch } from "react-redux";
import { checkoutActions } from "../../../store/checkoutReducers/checkoutSlice";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartProducts.cartProducts);
  const dispatch = useDispatch();
  const [checkoutToken, setCheckoutToken] = useState("");
  const [shippingCountries, setShippingCountries] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingDivisions, setShippingDivisions] = useState("");
  const [shippingDivision, setShippingDivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState("");
  const [shippingOption, setShippingOption] = useState("");
  const [formdetails, setFormDetails] = useState({});

  //generate Token UseEffect
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
        console.log("checkout token", token);
      } catch (err) {
        console.log(err);
      }
    };
    generateToken();
  }, [cart]);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const states = Object.entries(shippingDivisions).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const sOptions =
    shippingOptions &&
    shippingOptions.map((sOption) => ({
      id: sOption.id,
      label: `${sOption.description} - (${sOption.price.formatted_with_symbol})`,
    }));
  //get countries

  useEffect(() => {
    const fetchingCountries = async () => {
      if (checkoutToken) {
        const { countries } =
          await commerce.services.localeListShippingCountries(checkoutToken.id);
        console.log("countries", countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
      }
    };
    fetchingCountries();
  }, [checkoutToken]);

  //get subdivisions

  useEffect(() => {
    const fetchingSubdivisions = async (countryCode) => {
      if (checkoutToken) {
        const { subdivisions } = await commerce.services.localeListSubdivisions(
          countryCode
        );
        console.log("Subdivisions", subdivisions);
        setShippingDivisions(subdivisions);
        setShippingDivision(Object.keys(subdivisions)[0]);
      }
    };
    if (shippingCountry) {
      fetchingSubdivisions(shippingCountry);
    }
  }, [shippingCountry, checkoutToken]);

  //get shipping options
  useEffect(() => {
    const fetchShippingOptions = async (country, region = "CA") => {
      const options = await commerce.checkout.getShippingOptions(
        checkoutToken.id,
        { country, region }
      );
      console.log("options", options);
      setShippingOptions(options);
      setShippingOption(options[0].id);
    };
    if (shippingDivision) {
      fetchShippingOptions(shippingCountry, shippingDivision);
    }
  }, [shippingDivision, checkoutToken, shippingCountry]);

  //update form details

  const updateFormDetails = (e) => {
    setFormDetails({
      ...formdetails,
      [e.target.name]: e.target.value,
    });
  };

  // form submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      ...formdetails,
      shippingCountry,
      shippingDivision,
      shippingOption,
    };
    console.log("formdata", formData);
    dispatch(checkoutActions.checkoutFormData(formData));
    navigate("/payment-gateway");
  };
  return (
    <>
      <section className={classes.checkoutCard}>
        <h3>Shipping Address:</h3>
        <form onSubmit={submitHandler}>
          <section>
            <div>
              <label htmlFor="fname">
                First Name:<span>*</span>
              </label>
              <input
                type="text"
                id="fname"
                placeholder="First name"
                name="fname"
                required
                maxLength="20"
                onChange={updateFormDetails}
              />
            </div>
            <div>
              <label htmlFor="lname">
                Last Name:<span>*</span>
              </label>
              <input
                type="text"
                id="lname"
                placeholder="Last name"
                name="lname"
                required
                maxLength="20"
                onChange={updateFormDetails}
              />
            </div>
          </section>
          <section>
            <div>
              <label htmlFor="email">
                Email:<span>*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                required
                onChange={updateFormDetails}
              />
            </div>

            <div>
              <label htmlFor="mob">
                Contact Number:<span>*</span>
              </label>
              <input
                type="number"
                id="mob"
                placeholder="Number (with ISD Code)"
                name="mob"
                required
                maxLength="12"
                onChange={updateFormDetails}
              />
            </div>
          </section>

          <section>
            <div>
              <label htmlFor="address">
                Address Line 1:<span>*</span>
              </label>
              <input
                type="text"
                id="address"
                placeholder="Building Number, Street, Area, Locality"
                name="address"
                required
                onChange={updateFormDetails}
              />
            </div>
            <div>
              <label htmlFor="address2">Address Line 2:</label>
              <input
                type="text"
                id="address2"
                placeholder="District, Landmark"
                name="address2"
                onChange={updateFormDetails}
              />
            </div>
          </section>

          <section>
            <div>
              <label htmlFor="city">
                City:<span>*</span>
              </label>
              <input
                type="text"
                id="city"
                placeholder="City"
                name="city"
                onChange={updateFormDetails}
              />
            </div>
            <div>
              <label htmlFor="zipcode">
                Area/Zip Code:<span>*</span>
              </label>
              <input
                type="number"
                id="zipcode"
                placeholder="Zip Code"
                name="zipcode"
                required
                onChange={updateFormDetails}
              />
            </div>
          </section>

          <section>
            <div>
              <label htmlFor="country">Shipping Country:</label>

              <select
                name="country"
                id="country"
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
                required
              >
                {countries &&
                  countries.map((country) => (
                    <option value={country.id} key={country.id}>
                      {country.label}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label htmlFor="state">State:</label>

              <select
                name="state"
                id="state"
                value={shippingDivision}
                onChange={(e) => setShippingDivision(e.target.value)}
                required
              >
                {states &&
                  states.map((division) => (
                    <option value={division.id} key={division.id}>
                      {division.label}
                    </option>
                  ))}
              </select>
            </div>
          </section>
          <section>
            <div>
              <label htmlFor="shippingoptions">Shipping Options:</label>

              <select
                name="shippingoptions"
                id="shippingoptions"
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
                required
              >
                {sOptions &&
                  sOptions.map((sOption) => (
                    <option value={sOption.id} key={sOption.id}>
                      {sOption.label}
                    </option>
                  ))}
              </select>
            </div>
          </section>

          <button type="submit">Proceed to Pay</button>
        </form>
      </section>
    </>
  );
};

export default CheckoutForm;
