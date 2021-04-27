import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleGalaxy } from '../store/singleGalaxy';
import { addToCart } from '../store/cart';
import { Link } from 'react-router-dom';

class SingleGalaxy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleGuestClick = this.handleGuestClick.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  componentDidMount() {
    this.props.getSingleGalaxy(this.props.match.params.galaxyId);
  }

  handleClick() {
    if (!this.props.isLoggedIn) {
      this.handleGuestClick();
    } else {
      this.props.addToCart(
        this.props.userId,
        this.props.orderId,
        this.props.galaxy.id,
        { quantity: this.state.quantity, price: this.props.galaxy.price }
      );
    }
  }

  handleGuestClick() {
    const item = { ...this.props.galaxy, quantity: this.state.quantity };
    const cartItems =
      JSON.parse(window.localStorage.getItem('orderItems')) || [];
    const cartItemIds = cartItems.map((elem) => elem.id);
    const idx = cartItemIds.indexOf(item.id);
    if (idx === -1) {
      window.localStorage.setItem(
        'orderItems',
        JSON.stringify([...cartItems, item])
      );
    } else {
      const currentItem = cartItems[idx];
      currentItem.quantity =
        Number(currentItem.quantity) + Number(this.state.quantity);
      window.localStorage.setItem('orderItems', JSON.stringify(cartItems));
    }
  }

  updateQuantity(evt) {
    this.setState({
      quantity: evt.target.value,
    });
  }

  render() {
    const {
      name,
      price,
      distance,
      description,
      SKU,
      imageUrl,
      category,
    } = this.props.galaxy;
    return (
      <div id ="outer-single">
      <div className="single-galaxy-view">
          <img className="single-galaxy-image" src={imageUrl} />
        <div className="single-galaxy-info">
          <h1 id="single-galaxy-name">{name} galaxy</h1>
          <h2 id = "single-price">${(price / 100).toFixed(2)}</h2>
          <h3 className = "dis-type">{distance} billion light years away</h3>
          <h3 className = "dis-type">Type: {category} galaxy</h3>
          <h3 className = "dis-type">{description}</h3>
          <h3 className = "dis-type">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h3>
          <br />
          <div className="single-galaxy-buy">
            <h3 className ="dis-type">Quantity:</h3>
              <input
              className = "quant-field"
              type="number"
              min="0"
              value={this.state.quantity}
              onChange={this.updateQuantity}
            ></input>
          <div>
            <Link to="/cart">
              <button className = "add-to-cart" type="button" onClick={this.handleClick}>
                Add to Cart
              </button>
                </Link>
                </div>
          </div>
        </div>
        </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    galaxy: state.singleGalaxy,
    userId: state.auth.id,
    orderId: state.cart ? state.cart.id : null,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleGalaxy: (id) => dispatch(fetchSingleGalaxy(id)),
    addToCart: (userId, orderId, galaxyId, info) =>
      dispatch(addToCart(userId, orderId, galaxyId, info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleGalaxy);
