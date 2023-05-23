import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import CartDropdown from './CartDropdown';

const Header = () => {
    const navigate = useNavigate();
   const {isCartOpen, setIsCartOpen, cartItems, cartCount, cartTotal, clearItemFromCart } = useContext(CartContext);

   const isCartOpenHandler = () => {
    setIsCartOpen(prev => !prev)
   }

   const goToCheckoutHandler = () => {
        navigate('/shop')
   }
  return (
    <header>
        <p>Logo here</p>
        <NavLink to={'/'}>
            Home
        </NavLink>
        <button onClick={isCartOpenHandler}>cart {cartCount}</button>
        {
            isCartOpen &&
            <div>
                <div>
                    {cartItems?.map(item => {
                        return <CartDropdown key={item.id} item={item}/>
                    })}
                </div>
                <div>Total : {cartTotal}$</div>
                <button onClick={goToCheckoutHandler}>Proceed to checkout</button>
            </div>
        }
        
    </header>
  )
}

export default Header