import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, itemToAdd) => {
  const isItemInCart = cartItems.find(item => item.id === itemToAdd.id);

  if (isItemInCart) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, itemToAdd];
};

const clearCartItem = (cartItems, itemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== itemToClear.id)
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  //check if item exists and what is quantity, if quantity is 1 remove it
  const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);
  
  if(existingCartItem.quantity === 1)
  {
    return cartItems.filter((cartItem)=> cartItem.id !== cartItemToRemove.id)
  }
  
  // if quantity is more than 1 decrease quantity by 1
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
  {...cartItem, quantity: cartItem.quantity - 1} 
  : cartItem
  )
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCartItems = localStorage.getItem('cartItems');
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });
  const [cartItems, setCartItems] = useState([])
// const [cartItems, setCartItems] = useState(() => {
//     const storedCartItems = localStorage.getItem('cartItems');
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartCount(cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setCartTotal(
      cartItems.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.quantity * currentValue.price,
        0
      )
    );
  }, [cartItems]);

  const addItemToCart = (itemToAdd) => {
    setCartItems(addCartItem(cartItems, itemToAdd));
  };

  const removeItemFromCart = (itemToRemove) => {
    setCartItems(removeCartItem(cartItems, itemToRemove))
  }

  const clearItemFromCart = (itemToClear) => {
    setCartItems(clearCartItem(cartItems, itemToClear));
  }

  const cartValue = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
};