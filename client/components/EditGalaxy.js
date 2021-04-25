import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleGalaxy, updateGalaxy } from "../store/singleGalaxy";
import { destroyGalaxy } from "../store/allGalaxies";

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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.getSingleGalaxy(this.props.match.params.galaxyId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.galaxy !== prevProps.galaxy) {
      this.setState({ ...this.props.galaxy });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateGalaxy({ ...this.props.galaxy, ...this.state });
  }

  handleDelete() {
    if (confirm("Are you sure you want to delete this galaxy?")) {
      this.props.destroyGalaxy(this.props.galaxy.id);
    }
  }

  render() {
    const galaxy = this.props.galaxy;

    const { SKU, category, name } = this.state;

    //this makes sure that we are not feeding null to any value below
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
          <br />
          <button type="submit">Submit changes</button>
          <Link to={"/products"}>
            <button type="button">Cancel changes</button>
          </Link>
          <br />
          <br />
          <button type="button" onClick={this.handleDelete}>
            Delete This Galaxy
          </button>
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
    destroyGalaxy: (galaxyId) => dispatch(destroyGalaxy(galaxyId, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGalaxy);
