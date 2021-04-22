import React from 'react';
import { connect } from 'react-redux';
import { fetchGalaxy } from '../store/allGalaxies'
import {Link} from 'react-router-dom'


class AllGalaxies extends React.Component {
  componentDidMount() {
    this.props.getGalaxies()
  }
    render() {
        const galaxies = this.props.galaxy
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
    galaxies: state.galaxy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGalaxies: () => dispatch(fetchGalaxy()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllGalaxies);
