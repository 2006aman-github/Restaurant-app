import React, { useState } from "react";
import { useEffect } from "react";
import NavBar from "./NavBar";
import Card from "./Card";

function Menu() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetch("https://mern-restaurant-app.herokuapp.com/foodItems/sync", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFoodItems(data);
      })
      .catch((err) => alert(err.message));
  }, []);
  return (
    <div className="menu__page">
      <NavBar />
      <div className="menu__page__banner">
        <div className="menu__page__banner__left">
          <h1>FOODIES</h1>
          <div className="restaurant__details">
            <span>
              Fast Food, Beverages, Ice Creames, Meals and Many more....
            </span>
            <span>Costs Rs250.00 for one</span>
            <span>Minimum Order of Rs60.00</span>
            <br />
            <span>
              Adress: Street 23, Opp of Kangana University, Gandhinagar,
              Hyderabad
            </span>
            <span>Call +91 743849739</span>
            <span>Dine-in-Timing: 10am to 10pm</span>
          </div>
        </div>
        <div className="menu__page__banner__right">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            alt=""
          />
        </div>
      </div>
      <div className="cuisines__section">
        <div className="cuisines__section__header">
          <section>
            <h1>No worries when we are here</h1>
            <p>Order from wide variety of cuisines</p>
          </section>
          <div className="cuisines__search__bar">
            <input placeholder="search items" type="text" />
            <i className="fa fa-search"></i>
          </div>
        </div>
        <div className="cuisines__list">
          {foodItems.map((foodItem) => (
            <Card
              itemImage={foodItem.imageUrl}
              itemName={foodItem.name}
              isVeg={foodItem.isVeg}
              price={parseFloat(foodItem.price)}
              isCartItem={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
