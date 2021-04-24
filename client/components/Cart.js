import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchCart } from "../store/singleOrder";
import { connect } from "react-redux";
import CartItem from "./CartItem";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }

  componentDidMount() {
    this.props.fetchCart(this.props.id);
    this.setState({
      total: 0,
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn) {
      this.props.fetchCart(this.props.id);
      console.log("PREV PROPS", prevProps);
    }
    if (prevProps.cart.galaxies !== this.props.cart.galaxies) {
      this.calcTotal(this.props.cart.galaxies);
    }
  }

  calcTotal(galaxies) {
    let reducer = (accumulator, galaxy) => {
      let singleItemTotal =
        galaxy.orderItems.price * galaxy.orderItems.quantity;
      return accumulator + singleItemTotal;
    };
    const total = galaxies.reduce(reducer, 0);
    console.log("TOTAL:", total);
    this.setState({ total });
  }

  render() {
    const galaxies = this.props.cart.galaxies || [];

    return (
      <div id="cart_container">
        <div id="cart_list">
          <h2>My Cart</h2>
          {galaxies.map((galaxy) => (
            <CartItem key={galaxy.id} galaxy={galaxy} />
          ))}
        </div>
        <div id="cart_total">
          <p>Cart Total: ${this.state.total}</p>
          <Link to="/checkout">
            <button id="go_checkout">Go To Checkout</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.singleOrder,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
