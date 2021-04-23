import axios from "axios";

const SET_CART = "SET_CART";

export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get(`/api/users/${id}/cart`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function singleOrderReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
