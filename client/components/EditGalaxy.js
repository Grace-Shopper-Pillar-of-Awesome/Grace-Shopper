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
      name: this.props.name,
      price: this.props.galaxy.price,
      distance: this.props.galaxy.distance,
      inventory: this.props.galaxy.inventory,
      description: this.props.galaxy.distance,
      SKU: this.props.galaxy.SKU,
      imageUrl: this.props.galaxy.imageUrl,
      category: this.props.galaxy.category
    }
  }

  componentDidMount() {
      //gets the single galaxy that is to be edited
      //How to get the galaxy's id though???
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
    this.props.updateGalaxy(this.props.galaxy, this.props.galaxy.id)
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
          <label htmlFor="price">Price:</label>
          <input name="price" onChange={this.handleChange} value={this.price} type="number" />
          <label htmlFor="distance">Distance:</label>
          <input name="distance" onChange={this.handleChange} value={this.distance} type="number" />
          <label htmlFor="inventory">Inventory:</label>
          <input name="inventory" onChange={this.handleChange} value={this.inventory} type="number" />
          <label htmlFor="description">Description</label>
          <textarea name="description" onChange={this.handleChange} value={this.description} />
          <label htmlFor="SKU">SKU:</label>
          <input name="SKU" onChange={this.handleChange} value={this.SKU} />
          <label htmlFor="imageUrl">imageURL:</label>
          <input name="imageUrl" onChange={this.handleChange} value={this.imageUrl} />
          <label htmlFor="category">Category:</label>
          <select name="category" onChange={this.handleChange} value={this.category}>
              <option name="spiral">Spiral</option>
              <option name="elliptical">Elliptical</option>
              <option name="irregular">Irregular</option>
          </select>
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
