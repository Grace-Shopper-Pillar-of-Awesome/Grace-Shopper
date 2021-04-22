import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleGalaxy } from "../store/singleGalaxy";

class SingleGalaxy extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSingleGalaxy(this.props.match.params.galaxyId);
  }

  handleClick() {
    console.log("button was clicked")
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
      <div className="single-galaxy-view">
        <div className="single-galaxy-image">
          <img src={imageUrl} />
        </div>
        <div className="single-galaxy-info">
          <h1 id="single-galaxy-name">{name}</h1>
          <h2>${price / 100}</h2>
          <h3>{distance} billion light years away</h3>
          <h3>Type: {category} galaxy</h3>
          <p>{description}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <br/>
          <div className="single-galaxy-buy">
          <h4>Quantity:</h4>
          <input type="number" min="0"></input> 
          <br/>
          <button type="button" onClick={this.handleClick}>Add to cart</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  galaxy: state.singleGalaxy,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleGalaxy: (id) => dispatch(fetchSingleGalaxy(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleGalaxy);
