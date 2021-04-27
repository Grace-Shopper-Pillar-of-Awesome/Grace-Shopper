import React from 'react';
import { connect } from 'react-redux';
import { fetchGalaxies } from '../store/allGalaxies';
import { Link } from 'react-router-dom';

export class AllGalaxies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elliptical: true,
      irregular: true,
      spiral: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getGalaxies();
  }

  handleChange(evt) {
    const checked = this.state[evt.target.name];
    this.setState({
      [evt.target.name]: !checked,
    });
  }

  render() {
    const galaxies = this.props.galaxies;
    return (
      <div>
        <h1 className="destinations">Where Do You Wanna Go? </h1>
        <label htmlFor="elliptical">
          Elliptical:
          <input
            type="checkbox"
            name="elliptical"
            onChange={this.handleChange}
            checked={this.state.elliptical}
          />
        </label>
        <label htmlFor="irregular">
          Irregular:
          <input
            type="checkbox"
            name="irregular"
            onChange={this.handleChange}
            checked={this.state.irregular}
          />
        </label>
        <label htmlFor="spiral">
          Spiral:
          <input
            type="checkbox"
            name="spiral"
            onChange={this.handleChange}
            checked={this.state.spiral}
          />
        </label>
        <div id="outer-galaxies-container">
          {galaxies
            .filter((galaxy) => this.state[galaxy.category])
            .map((galaxy) => {
              return (
                <div className="galaxy-info" key={galaxy.id}>
                  <Link to={`/galaxies/${galaxy.id}`}>
                    <img className="galaxy-img" src={galaxy.imageUrl} />
                    <h1 className="galaxy-name">{galaxy.name}</h1>
                    <h3 className="galaxy-price">
                      ${(galaxy.price / 100).toFixed(2)}
                    </h3>
                    <p className="galaxy-category">
                      Category: {galaxy.category}
                    </p>
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
