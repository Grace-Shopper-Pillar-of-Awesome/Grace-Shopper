import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { destroyGalaxy } from '../store/allGalaxies';

const ProductRow = (props) => {
  console.log(props);
  const product = props.product;
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this galaxy?')) {
      props.destroyGalaxy(product.id);
    }
  };
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.SKU}</td>
      <td>{product.price / 100}</td>
      <td>{product.inventory}</td>
      <td>
        <Link to={`/galaxies/${product.id}/edit`} key={product.SKU}>
          Edit
        </Link>
      </td>
      <td>
        <button onClick={handleDelete}>X</button>
      </td>
    </tr>
  );
};

const mapDispatch = (dispatch, { history }) => ({
  destroyGalaxy: (galaxyId) => dispatch(destroyGalaxy(galaxyId, history)),
});

export default connect(null, mapDispatch)(ProductRow);
