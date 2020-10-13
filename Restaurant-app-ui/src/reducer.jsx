import axios from "./axios";
export const initialState = {
  cart: [],
  total: 0,
  user: null,
  checkedOut: { checkOutStatus: false },
  tax_and_charges: 30,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let new_cart = [...state.cart, action.item];

      // checking if the item which is added is there  in the previously existing cart
      let duplicate_item = state.cart.find(function (item) {
        return item?.name === action.item?.name;
      });
      if (duplicate_item) {
        // removing the item which is just added since its already available
        new_cart.pop();
        duplicate_item.qty += action?.item?.qty;
        if (duplicate_item.qty == 0) {
          new_cart.splice([new_cart.indexOf(duplicate_item)], 1);
        }
      }
      state.total = 0;
      new_cart.map((item) => {
        state.total += item.price * item.qty;
      });

      return {
        ...state,
        cart: new_cart,
        total: state.total,
      };
    case "ADD_USER":
      state.user = action.user;
      return {
        ...state,
        user: state.user,
      };

    case "CHECK_OUT":
      state.checkedOut = {
        checkOutStatus: action.checkOutStatus,
        location: action.location,
        cart: action.cart,
        total: action.total,
        contact: action.contact,
        orderStatus: action.orderStatus,
      };
      return {
        ...state,
        checkedOut: state.checkedOut,
      };

    default:
      return state;
  }
};

export default reducer;
