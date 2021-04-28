import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, fetchCart } from '../store/cart';

/**
 * COMPONENT
 */

export class Home extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) this.props.fetchCart(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.fetchCart(this.props.id);
    }
    if (prevProps.cart !== this.props.cart) {
      // This will add new galaxies to cart based on what was in local storage and/or replace galaxy quantity from cart with latest quantity in local storage
      const cart = JSON.parse(window.localStorage.getItem('orderItems'));
      if (cart) {
        cart.forEach((item) => {
          this.props.addToCart(this.props.id, this.props.cart.id, item.id, {
            quantity: Number(item.quantity),
            price: item.price,
          });
        });
      }
      window.localStorage.removeItem('orderItems');
    }
  }

  render() {
    return (
      <div>
        <div>
          <header>
            <div className="title">
              <h1 className="far">Far, Far Away...</h1>
            </div>
          </header>
        </div>

        <div>
          <div className="welcome">
            <div>
              <h1 className="enough-space">
                There's enough space to go around...
              </h1>
            </div>
            <p className="paragraph">
              The universe... that immense open space, full of adventures and
              possibilities.
            </p>
            <p className="paragraph">
              <p>
                For centuries, humans have wondered about the sky and its
                limits...
              </p>
              <span className="bold-words">TODAY</span> you can not only witness
              its greatness but also <span className="bold-words">OWN</span>{' '}
              your own piece of it.
            </p>
            <p className="paragraph">
              We are <span className="bold-words">Far, Far Away...</span>, a
              great way to explore the universe by acquiring a little piece of
              the infinite.
            </p>
            <p className="paragraph">
              Feel what it feels like to own your own galaxy at the edge of the
              universe and enjoy the power of{' '}
              <span className="bold-words">freedom</span>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapState = (state) => ({
  isLoggedIn: !!state.auth.id,
  id: state.auth.id,
  cart: state.cart,
});

const mapDispatch = (dispatch) => ({
  fetchCart: (id) => dispatch(fetchCart(id)),
  addToCart: (userId, orderId, galaxyId, info) =>
    dispatch(addToCart(userId, orderId, galaxyId, info)),
});

export default connect(mapState, mapDispatch)(Home);
