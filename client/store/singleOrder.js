import axios from 'axios';

const SET_CART = "SET_CART";
const DELETE_ITEM = "DELETE_ITEM;
const CLEAR_CART = 'CLEAR_CART';

export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};


export const deleteItem = (galaxy) => {
  return {
    type: DELETE_ITEM,
    galaxy
  }
}

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


export const destroyItem = (order, userId, galaxyId) => {
  return async (dispatch) => {
    try {
      console.log("DESTROY ITEM REACHED")
      const orderId = order.id
      const token = window.localStorage.getItem("token");
      const { data } = await axios.delete(`/api/users/${userId}/${orderId}/${galaxyId}`, {
        headers: {
          authorization: token,
        },
      }
        );

      dispatch(deleteItem(data))

    } catch (error) {
      console.log(error)
    }
  }
}

export const submitOrder = (id, payment, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      await axios.put(`/api/users/${id}/checkout`, payment, {
        headers: {
          authorization: token,
        },
      });
      dispatch(clearCart());
      history.push('/orderConfirmation');
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
    case DELETE_ITEM:
      return {...state, galaxies : state.galaxies.filter((galaxy) => galaxy.id !== action.galaxy.galaxyId)}
    default:
      return state;
  }
}
