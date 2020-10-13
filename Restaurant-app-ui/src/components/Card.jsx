import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "../StateProvider";
import { Button, Snackbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Card({ itemImage, itemName, isVeg, price, isCartItem }) {
  const [cartItems, setCartItems] = useState([]);
  const [{ cart, total }, dispatch] = useStateValue();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const classes = useStyles();
  const [qty, setQty] = useState(0);
  const prevQty = useRef(0);
  let thisItem;

  useEffect(() => {
    let qty_change;
    if (prevQty.current < qty) {
      qty_change = 1;
    } else {
      qty_change = -1;
    }
    prevQty.current = qty;
    if (qty) {
      dispatch({
        type: "ADD_TO_CART",
        item: {
          name: itemName,
          image: itemImage,
          price: price,
          isVeg: isVeg,
          qty: qty_change,
        },
      });
    }
  }, [qty]);

  // getting the qty of the item in the cart
  if (isCartItem) {
    thisItem = cart.find((elem) => {
      return elem?.name === itemName;
    });
  }

  return (
    <div className="card">
      <div className="card__detail">
        <h5>
          {isVeg ? (
            <img src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png" />
          ) : (
            <img src="https://img.icons8.com/color/48/000000/non-vegetarian-food-symbol.png" />
          )}
          <span>{itemName}</span>
        </h5>
        <small>Rs.{price}</small>

        <div className="add__button">
          {isCartItem ? (
            <Button className="btn" variant="contained" color="primary">
              <span className="btn_1" onClick={(e) => setQty(qty - 1)}>
                {" "}
                -{" "}
              </span>
              <b>{thisItem?.qty}</b>
              <span className="btn_1" onClick={(e) => setQty(qty + 1)}>
                {" "}
                +{" "}
              </span>
            </Button>
          ) : (
            <Button
              className="btn"
              variant="contained"
              color="primary"
              onClick={(e) => {
                setQty(qty + 1);
                setOpenSnackBar(true);
              }}
            >
              ADD +
            </Button>
          )}
        </div>
      </div>

      <img className="item__image" src={itemImage} alt="" />

      {/* snack bar  */}
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        autoHideDuration={2500}
        onClose={(e) => setOpenSnackBar(false)}
      >
        
        <Alert  severity="success" variant="filled">
          {" "}
          <span style={{ marginRight: "20px" }}>Item Added</span>{" "}
          <span style={{ marginRight: "10px" }}>
            SubTotal: Rs.
            {total}
          </span>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={(e) => setOpenSnackBar(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Card;
