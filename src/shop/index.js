const INITIAL_STATE = {
  products: [],
  favorites: [],
  cart: [],
};

function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'SET_PRODUCTS':
      return { ...state, products: payload };

    case 'ADD_TO_CART':
      const itemIndex = state.cart.findIndex(({ id }) => id === payload.id);
      if (itemIndex > -1) {
        return {
          ...state,
          cart: state.cart.map((item, i) => (i === itemIndex ? payload : item)),
        };
      }
      return { ...state, cart: [...state.cart, payload] };

    case 'REMOVE_FROM_CART':
      const productIndex = state.cart.findIndex(({ id }) => id === payload);

      if (productIndex > -1) {
        return {
          ...state,
          cart: state.cart
            .map((cartItem, i) =>
              i === productIndex ? { ...cartItem, count: cartItem.count - 1 } : cartItem,
            )
            .filter(item => item.count > 0),
        };
      }
      break;

    case 'TOGGLE_FAVORITE':
      if (state.favorites.includes(payload)) {
        return { ...state, favorites: state.favorites.filter(id => id !== payload) };
      }

      return { ...state, favorites: [...state.favorites, payload] };
    default:
      return state;
  }
}

export default reducer;
