import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleGalaxy, updateGalaxy } from "../store/singleGalaxy";

class EditGalaxy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    //set default values to current values for easier editing.
    //EX: If you needed to change only one word in the description, 
    //you would want the original description to appear in the form box.
      id: this.props.galaxy.id,
      name: this.props.name,
      price: this.props.galaxy.price,
      distance: this.props.galaxy.distance,
      description: this.props.galaxy.distance,
      SKU: this.props.galaxy.SKU,
      imageUrl: this.props.galaxy.imageUrl,
      category: this.props.galaxy.category
    }
  }

  componentDidMount() {
      //gets the single galaxy that is to be edited
    this.props.getSingleGalaxy(this.props.match.params.galaxyId);
  }

  handleChange(evt) {
      //updates the field in the state
      this.setState({
          [evt.target.name]: evt.target.value
      });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    //run updateGalaxy, providing the current galaxy that is being edited, and the id of the current galaxy
    this.props.updateGalaxy(this.state.galaxy, this.state.galaxy.id)
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
        <form id="galaxy-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input name="name" onChange={this.handleChange} value={this.name} />
          <br/>
          <button type="submit">Submit changes</button>
          <button type="button">Cancel changes</button>
        </form>
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
    updateGalaxy: (galaxy, id) => dispatch(updateGalaxy(galaxy,id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGalaxy);
