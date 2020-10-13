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
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import axios from '../axios'

function TotalCard({ cardHeader, cardContent, isFinalCard }) {
  let extra_charge = 30;
  const [{ cart, total, user, checkedOut }, dispatch] = useStateValue();
  // const [checkedOut, setcheckedOut] = useState(false);
  const placeOrder = () => {
    axios.post('/user/orders/new', {
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: {
        "location": 'll'
      }
    }).then()
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
                Taxes & Charges: Rs.{30}
              </Typography>
              <br />
              <br />
            </>
          )}
          <hr />
          <Typography variant="h5" component="h2">
            Grand Total: Rs.{total + extra_charge}
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
                onClick={placeOrder}
                disabled={!checkedOut}
                variant="contained"
                color="primary"
              >
                PLACE ORDER
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
