import axios from 'axios';

/*const initialState = {
  date: {},
  id,
  orderStatus: '',
  paymentType: '',
  total,
  userId,
  galaxies: []
}*/

//galaxy: {
//info: {}

//}

//action types
const SET_CART = 'SET_CART';
const DELETE_ITEM = 'DELETE_ITEM';
const CLEAR_CART = 'CLEAR_CART';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';
const UPDATE_CART_TOTAL = 'UPDATE_TOTAL';

//action creators
export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const deleteItem = (galaxy) => {
  return {
    type: DELETE_ITEM,
    galaxy,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const updateItemQuantity = (updatedItem) => {
  return {
    type: UPDATE_ITEM_QUANTITY,
    updatedItem,
  };
};

export const updateCartTotal = (updatedOrder) => {
  return {
    type: UPDATE_CART_TOTAL,
    updatedOrder,
  };
};

//thunk creators
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
      const orderId = order.id;
      const token = window.localStorage.getItem('token');
      const { data } = await axios.delete(
        `/api/users/${userId}/${orderId}/${galaxyId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      dispatch(deleteItem(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const submitOrder = (id, payment, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.put(`/api/users/${id}/checkout`, payment, {
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

export const updateQuantity = (userId, orderId, galaxyId, quantity) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.put(
        `/api/users/cart/${userId}/${orderId}/${galaxyId}`,
        quantity,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(updateItemQuantity(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = (userId, orderId, galaxyId, info) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.put(
        `/api/users/${userId}/${orderId}/${galaxyId}`,
        info,
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(data);
      if (!data.id) {
        dispatch(updateItemQuantity(data));
      } else {
        dispatch(setCart(data));
      }
    } catch (error) {
      console.log('not adding item to cart in thunk', error);
    }
  };
};

export const changeCartTotal = (userId, orderId, total) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.put(
        `/api/users/${userId}/${orderId}`,
        total,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(updateCartTotal(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//subreducer
export default function singleOrderReducer(state = {}, action) {
  switch (action.type) {
    case CLEAR_CART:
      return {};
    case SET_CART:
      return action.cart;
    case DELETE_ITEM:
      return {
        ...state,
        galaxies: state.galaxies.filter(
          (galaxy) => galaxy.id !== action.galaxy.galaxyId
        ),
      };
    case UPDATE_ITEM_QUANTITY:
      let updatedGalaxies = state.galaxies.map((galaxy) => {
        if (galaxy.id === action.updatedItem.galaxyId) {
          return { ...galaxy, orderItems: action.updatedItem };
        }
        return galaxy;
      });
      return {
        ...state,
        galaxies: updatedGalaxies,
      };
    case UPDATE_CART_TOTAL:
      return { ...state, total: action.updatedOrder.total };
    default:
      return state;
  }
}
