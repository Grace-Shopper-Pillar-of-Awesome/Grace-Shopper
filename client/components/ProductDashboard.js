import React from "react";
import ProductRow from "./ProductRow";
import { connect } from "react-redux";
import { fetchGalaxies } from "../store/allGalaxies";

class ProductDashboard extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.setGalaxies();
  }

  render() {
    const galaxies = this.props.galaxies;

    return (
      <div>
        <h1 className="dashboard-header">PRODUCTS</h1>
        <br />
        <br />
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Product name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Inventory</th>
              <th>Page link</th>
            </tr>
            {galaxies.map((galaxy) => {
              return <ProductRow key={galaxy.id} product={galaxy} />;
            })}
          </tbody>
        </table>
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
    setGalaxies: () => dispatch(fetchGalaxies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDashboard);
