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
    }
  }

  render() {
    return (
      <div className="content">
        <header>
          <div className="title">
            <h1 className="far">Far, Far Away...</h1>
          </div>
        </header>
        {/* <div className="fade"></div> */}
        {/* <section className="star-wars">
        <div className="crawl">
          <div className="title">
            <p>There is enough space to go around</p>
            <h1>a galaxy far far away</h1>
          </div>
          <p>
            The universe... that inmense open space, full of adventures and
            posibilities.{' '}
          </p>
          <p>
            During centuries, human have wondered about the sky and its limits,
            today, you not only can witness its greateness but also can OWN your
            own piece of it.
          </p>
          <p>
            Introducing Galaxy X, a great way to explore the universe by
            acquiring a little piece of the infinite.
          </p>
          <p>
            Feel what it feels to own your own galaxy at the edge of the
            universe and enjoy the power of freedom.
          </p>
        </div>
      </section> */}
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
