import React, { Component } from 'react';
import { connect } from 'react-redux';
import { destroyItem, updateQuantity } from '../store/cart';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGuestChange = this.handleGuestChange.bind(this);
  }

  componentDidMount() {
    if (this.props.isLoggedIn)
      this.setState({
        quantity: this.props.galaxy.orderItems.quantity,
      });
  }

  handleChange(evt) {
    this.setState({
      quantity: evt.target.value,
    });
    if (this.props.isLoggedIn) {
      this.props.updateItemQuant(
        this.props.userId,
        this.props.cart.id,
        this.props.galaxy.id,
        { quantity: evt.target.value }
      );
    } else {
      this.handleGuestChange(evt);
    }
  }

  handleGuestChange(evt) {
    const cartItems = JSON.parse(window.localStorage.getItem('orderItems'));
    const cartItemIds = cartItems.map((elem) => elem.id);
    const idx = cartItemIds.indexOf(this.props.galaxy.id);
    const currentItem = cartItems[idx];
    currentItem.quantity = evt.target.value;
    window.localStorage.setItem('orderItems', JSON.stringify(cartItems));
  }

  handleDelete() {
    this.props.destroyItem(
      this.props.cart,
      this.props.userId,
      this.props.galaxy.id
    );
  }

  render() {
    const { name, imageUrl, price } = this.props.galaxy;
    return (
      <div>
        <div className="cart_item">
          <img src={imageUrl} />
          <div>
            <p className="cart_name">{name}</p>
            <p>${price / 100}</p>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              min={1}
              max={100}
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </div>
          <button
            className="delete"
            id="ORDER_ITEM_ID"
            onClick={this.handleDelete}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  cart: state.cart,
  isLoggedIn: !!state.auth.id,
});

const mapDispatchToProps = (dispatch) => {
  return {
    destroyItem: (order, userId, galaxyId) =>
      dispatch(destroyItem(order, userId, galaxyId)),
    updateItemQuant: (userId, orderId, galaxyId, quantity) =>
      dispatch(updateQuantity(userId, orderId, galaxyId, quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
