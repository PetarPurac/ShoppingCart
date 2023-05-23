import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext';

const CartDropdown = ({item}) => {
    const {isCartOpen, setIsCartOpen, cartItems, cartCount, cartTotal, clearItemFromCart, removeItemFromCart } = useContext(CartContext);
  return (
    <div>
        <h5>{item.title}</h5>
        <button onClick={() => removeItemFromCart(item)}>remove</button>
        <h6>{item.quantity}</h6>
        <button onClick={() => clearItemFromCart(item)}>x</button>
    </div>
    )
}

export default CartDropdown
