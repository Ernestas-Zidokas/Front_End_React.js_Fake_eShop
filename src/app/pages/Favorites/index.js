import React from 'react';
import { ProductCard } from '../../components';
import './index.scss';

function Favorites({ favorites, products = [], toggleFavorite, addToCart, cart, removeFromCart }) {
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return (
    <div className="Favorites">
      {!favoriteProducts.length && <p>Sorry, you don't have any favorited items!</p>}
      {favoriteProducts.map(data => {
        const { count = 0 } = cart.find(({ id }) => id === data.id) || {};

        return (
          <ProductCard
            isFavorite
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
            key={data.id}
            {...data}
            cartCount={count}
            removeFromCart={removeFromCart}
          />
        );
      })}
    </div>
  );
}

export default Favorites;
