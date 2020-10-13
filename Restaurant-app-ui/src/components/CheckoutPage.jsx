import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import TotalCard from "./TotalCard";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import * as Joi from "joi-browser";

const AdressSchema = {
  flatName: Joi.string().min(3).max(50).required(),
  HNo: Joi.string().min(5).required().max(10),
  locality: Joi.string().min(5).required().max(100),
  zip: Joi.string().length(6).required(),
  contact: Joi.string().length(10).required(),
};

function CheckoutPage() {
  const history = useHistory();
  const [
    { user, cart, checkedOut, total, tax_and_charges },
    dispatch,
  ] = useStateValue();
  const [flatName, setflatName] = useState("");
  const [HNo, setHNo] = useState("");
  const [locality, setlocality] = useState("");
  const [zip, setzip] = useState("");
  const [contact, setcontact] = useState("");
  const [flatNameError, setflatNameError] = useState(false);
  const [HNoError, setHNoError] = useState(false);
  const [localityError, setlocalityError] = useState(false);
  const [zipError, setzipError] = useState(false);
  const [contactError, setcontactError] = useState(false);

  if (!user && cart.length < 1) {
    history.replace("/menu");
  }
  let adressBody = {
    flatName: flatName,
    HNo: HNo,
    locality: locality,
    zip: zip,
    contact: contact,
  };
  // let fields = [flatName, HNo, locality, zip, contact];

  // validating the adress
  const validate = (e) => {
    e.preventDefault();
    const validation = Joi.validate(adressBody, AdressSchema);
    if (validation?.error?.details) {
      let error = validation?.error?.details[0].message;
      console.log(validation);
      if (error.includes("flatName")) {
        setflatNameError(error);
      } else if (error.includes("HNo")) {
        setHNoError(error);
      } else if (error.includes("locality")) {
        setlocalityError(error);
      } else if (error.includes("zip")) {
        setzipError(error);
      } else if (!Number.isInteger(parseInt(zip))) {
        setzipError("zip must be a numeric value");
      } else if (error.includes("contact")) {
        setcontactError(error);
      } else if (!Number.isInteger(parseInt(contact))) {
        setcontactError("contact must be a numeric value");
      }
    } else {
      dispatch({
        type: "CHECK_OUT",
        checkOutStatus: true,
        location: `${HNo}, ${flatName}, ${locality}, ZIP ${zip}`,
        cart: cart,
        total: parseInt(total) + parseInt(tax_and_charges),
        contact: contact,
        orderStatus: "Delivered",
      });
      setflatNameError(false);
      setHNoError(false);
      setlocalityError(false);
      setzipError(false);
      setcontactError(false);
    }
  };
  console.log(checkedOut);

  return (
    <>
      <NavBar />
      <div className="checkout">
        <div className="checkout__left">
          <Link
            style={{ color: "gray", textDecorationLine: "black" }}
            to="/cart"
          >
            <ArrowBackIosIcon style={{ fontSize: "small" }} /> Back
          </Link>
          <h1>Delivery Details</h1>
          <br />
          <h3>Adress</h3>
          <form className="checkout__form">
            <TextField
              value={flatName}
              onChange={(e) => setflatName(e.target.value)}
              error={flatNameError ? true : false}
              helperText={flatNameError}
              style={{ margin: "30px" }}
              type="text"
              id="standard-basic"
              label="Flat/Apartment/Floor"
            ></TextField>
            <TextField
              onChange={(e) => setHNo(e.target.value)}
              value={HNo}
              error={HNoError ? true : false}
              helperText={HNoError}
              style={{ margin: "30px" }}
              type="text"
              id="standard-basic"
              label="H No"
            ></TextField>
            <TextField
              onChange={(e) => setlocality(e.target.value)}
              value={locality}
              error={localityError ? true : false}
              helperText={localityError}
              style={{ margin: "30px" }}
              type="text"
              id="standard-basic"
              label="Locality"
            ></TextField>

            <TextField
              onChange={(e) => setzip(e.target.value)}
              value={zip}
              error={zipError ? true : false}
              helperText={zipError}
              style={{ margin: "30px" }}
              type="text"
              id="standard-basic"
              label="ZIP Code"
            ></TextField>
            <TextField
              onChange={(e) => setcontact(e.target.value)}
              value={contact}
              error={contactError ? true : false}
              helperText={contactError}
              style={{ margin: "30px" }}
              type="text"
              id="standard-basic"
              label="Contact Number"
            ></TextField>
            <Button
              disabled={checkedOut.checkOutStatus}
              onClick={validate}
              variant="contained"
              color="secondary"
            >
              CHECKOUT
            </Button>
          </form>
        </div>
        <div className="checkout__right">
          <TotalCard
            cardHeader="Order Summary"
            cardContent={cart}
            isFinalCard={true}
          />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
