import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleGalaxy, updateGalaxy } from "../store/singleGalaxy";

const initialState = {
  name: "",
  price: 0,
  distance: 0,
  inventory: 0,
  description: "",
  SKU: "",
  imageURL: "",
  category: "irregular",
};

class EditGalaxy extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    //set default values to current values for easier editing.
    //EX: If you needed to change only one word in the description,
    //you would want the original description to appear in the form box.
    //They don't show up tho lol
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //gets the single galaxy that is to be edited
    this.props.getSingleGalaxy(this.props.match.params.galaxyId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.galaxy !== prevProps.galaxy) {
      this.setState({ ...this.props.galaxy });
    }
  }

  handleChange(evt) {
    //updates the field in the state
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    //run updateGalaxy, providing the current galaxy that is being edited, and the id of the current galaxy
    this.props.updateGalaxy({ ...this.props.galaxy, ...this.state });
  }

  render() {
    const galaxy = this.props.galaxy;

    const { SKU, category, name } = this.state;

    const description = this.state.description || "";
    const distance = this.state.distance || 0;
    const inventory = this.state.inventory || 0;
    const price = this.state.price || 0;
    const imageUrl = this.state.imageUrl || "";

    return (
      <div className="single-galaxy-view">
        <form id="galaxy-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input name="name" onChange={this.handleChange} value={name} />
          <label htmlFor="price">Price:</label>
          <input
            name="price"
            onChange={this.handleChange}
            value={price}
            type="number"
            step="100"
          />
          <label htmlFor="distance">Distance in billions of lightyears:</label>
          <input
            name="distance"
            onChange={this.handleChange}
            value={distance}
            type="number"
            min="0"
          />
          <label htmlFor="inventory">Inventory:</label>
          <input
            name="inventory"
            onChange={this.handleChange}
            value={inventory}
            type="number"
            min="0"
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            onChange={this.handleChange}
            value={description}
          />
          <label htmlFor="SKU">SKU:</label>
          <input name="SKU" onChange={this.handleChange} value={SKU} />
          <label htmlFor="imageUrl">imageURL:</label>
          <input
            name="imageUrl"
            onChange={this.handleChange}
            value={imageUrl}
          />{" "}
          <label htmlFor="category">Category:</label>
          <select name="category" onChange={this.handleChange} value={category}>
            <option name="spiral">spiral</option>
            <option name="elliptical">elliptical</option>
            <option name="irregular">irregular</option>
          </select>
          <br />
          <button type="submit">Submit changes</button>
          <Link to={"/products"}>
            <button type="button">Cancel changes</button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  galaxy: state.singleGalaxy,
});

const mapDispatchToProps = (dispatch, { history, match }) => {
  return {
    getSingleGalaxy: (id) => dispatch(fetchSingleGalaxy(id)),
    updateGalaxy: (galaxy) =>
      dispatch(updateGalaxy(galaxy, history, match.params.galaxyId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGalaxy);
