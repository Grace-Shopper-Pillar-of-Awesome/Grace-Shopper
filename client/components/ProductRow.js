import React from 'react';
import { Link } from 'react-router-dom'

const ProductRow = (props) => {
    const product = props.product

    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.SKU}</td>
            <td>{product.price/100}</td>
            <td>{product.inventory}</td>
            <td>
                <Link to={`/galaxies/${product.id}/edit`} key={product.SKU}>
                    Edit
                </Link>
            </td>
        </tr>
    )
}

export default ProductRow