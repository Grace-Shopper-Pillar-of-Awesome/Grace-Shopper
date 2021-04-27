import React from 'react';
import { connect } from 'react-redux';
import { fetchGalaxies } from '../store/allGalaxies';
import { Link } from 'react-router-dom';

class AllGalaxies extends React.Component {
  componentDidMount() {
    this.props.getGalaxies();
  }

  render() {
    const galaxies = this.props.galaxies;
    return (
      <div>
        <h1 className="destinations">Where Do You Wanna Go? </h1>
        <div id="outer-galaxies-container">
          {galaxies.map((galaxy) => {
            return (
              <div className="galaxy-info" key={galaxy.id}>
                <Link to={`/galaxies/${galaxy.id}`}>
                <img className="galaxy-img" src={galaxy.imageUrl} />
                  <h1 className="galaxy-name">{galaxy.name}</h1>
                  <h3 className="galaxy-price">
                    ${(galaxy.price / 100).toFixed(2)}
                  </h3>
                  <p className="galaxy-category">Category: {galaxy.category}</p>
                </Link>
              </div>
            );
          })}
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
