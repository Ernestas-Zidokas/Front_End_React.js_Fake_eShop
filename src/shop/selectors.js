import { MODULE_NAME } from './constants';

export const getProducts = state => state[MODULE_NAME].products;
export const getFavorites = state => state[MODULE_NAME].favorites;
export const getCart = state => state[MODULE_NAME].cart;

export const getCartItem = (state, id) => {
  const { cart } = state[MODULE_NAME];
  return cart.find(item => item.id === id);
};

export const isProductFavorite = (state, id) => state[MODULE_NAME].favorites.includes(id);

export const getCartProducts = state => {
  const cartProducts = state[MODULE_NAME].cart.map(item => {
    const product = state[MODULE_NAME].products.find(({ id }) => id === item.id);

    return { ...product, ...item };
  });
  return cartProducts;
};

export const getFavoriteProducts = state => {
  const { favorites, products } = state[MODULE_NAME];
  return products.filter(product => favorites.includes(product.id));
};

export const getProductById = (state, id) =>
  state[MODULE_NAME].products.find(product => product.id === id);
