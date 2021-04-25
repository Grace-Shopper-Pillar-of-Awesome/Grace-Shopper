import React from 'react';
import ProductRow from './ProductRow';
import { connect } from 'react-redux';
import { fetchGalaxies } from '../store/allGalaxies';
import { Link } from 'react-router-dom'

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
        {this.props.userType === 'admin' ? (
          <div>
            <h1 className="dashboard-header">PRODUCTS</h1>
            <br />
            <br />
            <Link to={`/products/add`}>
            <button type="button">Add new product</button>
            </Link>
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
        ) : (
          <p>You shall not pass!</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    galaxies: state.allGalaxies,
    userType: state.auth.userType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGalaxies: () => dispatch(fetchGalaxies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDashboard);
