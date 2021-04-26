import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleGalaxy, updateGalaxy } from "../store/singleGalaxy";
import { destroyGalaxy } from "../store/allGalaxies";
import GalaxyForm from "./GalaxyForm"

class EditGalaxy extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.getSingleGalaxy(this.props.match.params.galaxyId);
  }

  handleDelete() {
    if (confirm("Are you sure you want to delete this galaxy?")) {
      this.props.destroyGalaxy(this.props.galaxy.id);
    }
  }

  render() {
    const galaxy = this.props.galaxy;
    
    return (
      <div>
        {this.props.userType === 'admin' ? (
          <div>
          <GalaxyForm galaxy={galaxy} submit={this.props.updateGalaxy}/>
          <button type="button" onClick={this.handleDelete}>
            Delete This Galaxy
          </button>
          </div> ) : (
            <p>You shall not pass!</p>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  galaxy: state.singleGalaxy,
  userType: state.auth.userType
});

const mapDispatchToProps = (dispatch, { history, match }) => {
  return {
    getSingleGalaxy: (id) => dispatch(fetchSingleGalaxy(id)),
    updateGalaxy: (galaxy) =>
      dispatch(updateGalaxy(galaxy, history, match.params.galaxyId)),
    destroyGalaxy: (galaxyId) => dispatch(destroyGalaxy(galaxyId, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGalaxy);
