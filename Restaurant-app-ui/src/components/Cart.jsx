import React from "react";
import { useStateValue } from "../StateProvider";
import Card from "./Card";
import NavBar from "./NavBar";
import TotalCard from "./TotalCard";

function Cart() {
  const [{ cart }, dispatch] = useStateValue();
  console.log(cart);
  return (
    <div className="cart__page">
      <NavBar />
      <div className="cart__body">
        <div className="cart__items">
          <h1>Cart ({cart.length} items)</h1>
          {cart?.map((item) => (
            <Card
              itemImage={item?.image}
              itemName={item?.name}
              isVeg={item?.isVeg}
              price={item?.price + " x " + item?.qty}
              isCartItem={true}
            />
          ))}
        </div>
        <TotalCard />
      </div>
    </div>
  );
}

export default Cart;
