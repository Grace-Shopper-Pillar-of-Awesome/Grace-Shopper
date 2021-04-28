import React from 'react';
import { connect } from 'react-redux'
import { fetchCart } from '../store/cart'

const OrderConfirmation = (props) => {
  props.fetchCart(props.id)

  return (
    <div className="thank-you">
      <p>Thank You For Your Order!</p>
      <p>Pack Your Bags, You're Going On A Trip!</p>
      <p className ="disclaimer">*DISCLAIMER: Travel is not included in price.</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.auth.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);
