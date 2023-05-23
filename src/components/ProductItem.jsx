import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext';

const ProductItem = ({product}) => {
  const {addItemToCart} = useContext(CartContext);
  return ( 
    <div className='product-item' style={{width: '25%'}}>
        <img src={product.image} alt="" style={{width: '80%'}}/>
        <h1>{product.title}</h1>
        <span>{product.price}$</span>
        <span>Rating : {product.rating.rate} / 5</span>
        <button onClick={() => addItemToCart(product)}>Add to cart</button>
    </div>
  )
}

export default ProductItem