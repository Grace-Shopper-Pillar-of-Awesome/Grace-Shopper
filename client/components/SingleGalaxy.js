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
        <img src={imageUrl} />
        <h1>{name}</h1>
        <h2>${price / 100}</h2>
        <h3>{distance} billion light years away</h3>
        <h3>Type: {category} galaxy</h3>
        <p>{description}</p>
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
