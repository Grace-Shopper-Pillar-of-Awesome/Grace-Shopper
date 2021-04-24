import axios from 'axios';

const SET_CART = "SET_CART";
const DELETE_ITEM = "DELETE_ITEM";
const CLEAR_CART = 'CLEAR_CART';
//const ADD_ITEM = "ADD_ITEM"

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

// export const addItem = (cart) => {
//   return {
//     type: ADD_ITEM,
//     cart,
//   }
// }

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

// export const addToCart = (galaxyId) => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem('token');
//       const { data } = await axios.put(`/api/users/${userId}/cart/${galaxyId}`, { quantity: 1 }, {
//         headers: {
//           authorization: token,
//         },
//       });
//       const cart = data.cart
//       const orderItems = data.orderItems
//       dispatch(addItem(cart))
//       //const
//     } catch(error) {
//       console.log('not adding item to cart in thunk', error)
//     }
//   }
// }

export default function singleOrderReducer(state = {}, action) {
  switch (action.type) {
    case CLEAR_CART:
      return {};
    case SET_CART:
      return action.cart;
    case DELETE_ITEM:
      return {...state, galaxies : state.galaxies.filter((galaxy) => galaxy.id !== action.galaxy.galaxyId)}
    // case ADD_ITEM:
    //   return {...state, cart: action.cart, orderItems: action.orderItems};
    default:
      return state;
  }
}
