import React from "react";
import { connect } from "react-redux";
import { fetchGalaxies } from "../store/allGalaxies";
import { Link } from "react-router-dom";

class AllGalaxies extends React.Component {
  componentDidMount() {
    this.props.getGalaxies();
  }
  render() {
    const galaxies = this.props.galaxies;
    return (
      <div>
        {galaxies.map((galaxy) => {
          return (
            <div key={galaxy.id}>
              <Link to={`/galaxies/${galaxy.id}`}>
                <h1>{galaxy.name}</h1>
              </Link>
            </div>
          );
        })}
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
