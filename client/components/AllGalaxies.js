import React from "react";
import { connect } from "react-redux";
import { fetchGalaxies } from "../store/allGalaxies";
import { Link } from "react-router-dom";
import { addToCart } from '../store/cart'

class AllGalaxies extends React.Component {
  componentDidMount() {
    this.props.getGalaxies();
  }
  render() {
    const galaxies = this.props.galaxies;
    return (
      <div>
      <h1 className = "destinations">Destinations: </h1>
      <div id="outer-galaxies-container">
        {galaxies.map((galaxy) => {
          return (
            <div className = 'galaxy-info' key={galaxy.id}>
              <Link to={`/galaxies/${galaxy.id}`}>
                <h1 className = 'galaxy-name'>{galaxy.name}</h1>
              </Link>
              <img className='galaxy-img' src={galaxy.imageUrl} />
              <h3 className = 'galaxy-price'>${galaxy.price / 100}</h3>
              <p className='galaxy-category'>Category: {galaxy.category}</p>
              <button className = "all-galaxy-addcart" type="button" onClick={this.handleClick}>Add to cart</button>
            </div>
          );
        } ) }
        </div>
        </div>
    );
  }
} 

const mapStateToProps = (state) => {
  return {
    galaxies: state.allGalaxies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGalaxies: () => dispatch(fetchGalaxies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllGalaxies);
 