import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import axios from "../axios";

function TotalCard({ cardHeader, cardContent, isFinalCard }) {
  const history = useHistory();
  const [placingOrder, setplacingOrder] = useState(false);
  const [
    { cart, total, user, checkedOut, tax_and_charges },
    dispatch,
  ] = useStateValue();

  const orderBody = {
    location: checkedOut.location,
    contact: checkedOut.contact,
    totalAmount: checkedOut.total,
    items: cart,
    status: checkedOut.orderStatus,
    tax_and_charges: tax_and_charges,
  };
  // console.log(checkedOut.total);

  const placeOrder = async () => {
    // setplacingOrder(true);
    await fetch("https://mern-restaurant-app.herokuapp.com/user/orders/new/", {
      method: "POST",
      body: JSON.stringify(orderBody),
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setplacingOrder(false);
        history.replace("/orders");
      })
      .catch((err) => console.log(err.message));
    // console.log(res.data.headers["auth-token"]);
  };

  return (
    <div>
      <Card variant="outlined" className="total__card">
        <CardContent>
          <Typography variant="h5" component="h2">
            {cardHeader}
          </Typography>
          <hr />
          <br />
          <br />
          {isFinalCard ? (
            <Typography color="textSecondary">
              <InputLabel htmlFor="age-native-simple">Your Order</InputLabel>
              <Select
                style={{ width: "100%" }}
                variant="filled"
                value="Your Items"
              >
                {cart.map((item) => (
                  <MenuItem value={item?.name}>
                    {item?.name} {" | "} {"Qty: "}
                    <span>{item?.qty}</span>
                  </MenuItem>
                ))}
              </Select>
              <br />
            </Typography>
          ) : (
            <>
              <Typography color="textSecondary">
                Initial Amount: Rs.{total}
              </Typography>
              <br />
              <br />
              <Typography color="textSecondary">
                Taxes & Charges: Rs.{tax_and_charges}
              </Typography>
              <br />
              <br />
            </>
          )}
          <hr />
          <Typography variant="h5" component="h2">
            Grand Total: Rs.{total + tax_and_charges}
          </Typography>
        </CardContent>
        <CardActions style={{ width: "100%" }}>
          {!user ? (
            <Link to="/login" style={{ width: "100%" }}>
              <Button variant="contained" color="primary">
                SIGN IN TO CONTINUE
              </Button>
            </Link>
          ) : cart.length > 0 ? (
            isFinalCard ? (
              <Button
                onClick={(e) => {
                  placeOrder();
                  setplacingOrder(true);
                }}
                disabled={!checkedOut.checkOutStatus}
                variant="contained"
                color="primary"
              >
                {placingOrder ? "PLACING YOUR ORDER" : "PLACE ORDER"}
              </Button>
            ) : (
              <Link style={{ width: "100%" }} to="/checkout">
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  color="primary"
                >
                  PROCEED TO CHECKOUT
                </Button>
              </Link>
            )
          ) : (
            <Button disabled variant="contained" color="primary">
              PROCEED TO CHECKOUT
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
}

export default TotalCard;
