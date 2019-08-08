import React, { useState } from 'react';
import { useFetch } from '../hooks';
import { API_ENDPOINTS } from '../../constants';
import { toggleArrayItem } from '../util';

const DEFAULT_SHOP_CONTEXT = {
  products: [],
  loading: false,
  error: null,
};

const ShopContext = React.createContext(DEFAULT_SHOP_CONTEXT);

function onError() {
  return 'Ooops! Something went wrong ⚰️';
}

function ShopProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleFavorite = id => {
    setFavorites(toggleArrayItem(favorites, id));
  };

  const addToCart = id => {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      setCart(cart.map((item, i) => (i === itemIndex ? { ...item, count: item.count + 1 } : item)));
    } else {
      setCart([...cart, { id, count: 1 }]);
    }
  };

  // const removeFromCart = id => {
  //   setCart(cart.filter(item => item.id !== id));
  // };

  const removeFromCart = removeId => {
    const itemIndex = cart.findIndex(({ id }) => id === removeId);

    if (itemIndex > -1) {
      setCart(
        cart
          .map((cartItem, i) =>
            i === itemIndex ? { ...cartItem, count: cartItem.count - 1 } : cartItem,
          )
          .filter(item => item.count > 0),
      );
    }
  };

  const { loading, products, error } = useFetch({
    onError,
    src: API_ENDPOINTS.getProducts,
    initialState: DEFAULT_SHOP_CONTEXT.products,
    dataKey: 'products',
  });

  return (
    <ShopContext.Provider
      value={{
        products,
        loading,
        error,
        addToCart,
        toggleFavorite,
        removeFromCart,
        cart,
        favorites,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export default ShopContext;
export { ShopProvider };
