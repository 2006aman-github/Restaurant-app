import React, { useEffect } from "react";

function Card({ itemImage, itemName, isVeg, price }) {
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
          <button>ADD +</button>
        </div>
      </div>
      <img className="item__image" src={itemImage} alt="" />
    </div>
  );
}

export default Card;
