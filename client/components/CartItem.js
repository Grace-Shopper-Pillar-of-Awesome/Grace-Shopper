import React, { Component } from 'react';
import { connect } from 'react-redux';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.galaxy.orderItems.quantity,
    });
  }

  handleChange(evt) {
    this.setState({
      quantity: evt.target.value,
    });
  }

  render() {
    const { name, orderItems, imageUrl } = this.props.galaxy;
    const { price } = orderItems;
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

export default connect(null, null)(CartItem);
