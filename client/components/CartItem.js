import React, { Component } from 'react';
import { connect } from 'react-redux';
import { destroyItem, updateQuantity } from '../store/cart';
import { Link } from 'react-router-dom';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleGuestDelete = this.handleGuestDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGuestChange = this.handleGuestChange.bind(this);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.setState({
        quantity: this.props.galaxy.orderItems.quantity,
      });
    } else {
      const cartItems = JSON.parse(window.localStorage.getItem('orderItems'));
      const currentItem = cartItems.find(
        (item) => item.id === this.props.galaxy.id
      );
      this.setState({
        quantity: Number(currentItem.quantity),
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.galaxy.orderItems !== this.props.galaxy.orderItems) {
      this.setState({
        quantity: this.props.galaxy.orderItems.quantity,
      });
    }
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
    if (this.props.isLoggedIn) {
      this.props.destroyItem(
        this.props.cart,
        this.props.userId,
        this.props.galaxy.id
      );
    } else {
      this.handleGuestDelete();
    }
  }

  handleGuestDelete() {
    const cartItems = JSON.parse(window.localStorage.getItem('orderItems'));
    const updatedItems = cartItems.filter(
      (item) => item.id !== this.props.galaxy.id
    );
    window.localStorage.setItem('orderItems', JSON.stringify(updatedItems));
    console.log(window.localStorage);
    this.setState({ quantity: 0 });
  }

  render() {
    const { name, imageUrl, price } = this.props.galaxy;
    return (
      <div id="cart-item-outer">
        {this.state.quantity > 0 ||
        document.activeElement.id === this.props.galaxy.id + '' ? (
          <div className="cart_item">
            <img className="cart-item-img" src={imageUrl} />
            <div className="cart-item-info">
              <Link to={`/galaxies/${this.props.galaxy.id}`}>
                <p className="cart_name">{name}</p>
              </Link>
              <p className="dis-type">${(price / 100).toFixed(2)}</p>
              <label className="dis-type" htmlFor="quantity">
                Quantity:
              </label>
              <input
                id={this.props.galaxy.id}
                type="number"
                min={1}
                max={100}
                name="quantity"
                className="cart-item-input"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
            </div>
            <button className="delete-btn" onClick={this.handleDelete}>
              X
            </button>
          </div>
        ) : (
          ''
        )}
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
