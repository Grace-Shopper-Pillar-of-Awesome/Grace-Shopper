import axios from 'axios';

const SET_CART = 'SET_CART';
const CLEAR_CART = 'CLEAR_CART';

export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
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

export const submitOrder = (id, payment, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      await axios.put(`/api/users/${id}/checkout`, {
        headers: {
          authorization: token,
        },
        body: {
          paymentType: payment,
        },
      });
      dispatch(clearCart());
      history.push('/home');
    } catch (error) {
      console.log(error);
    }
  };
};

export default function singleOrderReducer(state = {}, action) {
  switch (action.type) {
    case CLEAR_CART:
      return {};
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
