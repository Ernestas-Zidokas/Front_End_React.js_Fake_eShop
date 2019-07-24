import React from 'react';
import { Loader, ProductCard } from '../../components';
import './index.scss';

function Products({
  isLoading,
  error,
  products = [],
  toggleFavorite,
  favorites,
  addToCart,
  cart,
  removeFromCart,
}) {
  return (
    <div className="Products">
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {products.map(data => {
        const { count = 0 } = cart.find(({ id }) => id === data.id) || {};

        return (
          <ProductCard
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
            key={data.id}
            {...data}
            isFavorite={favorites.includes(data.id)}
            cartCount={count}
            removeFromCart={removeFromCart}
          />
        );
      })}
    </div>
  );
}

export default Products;
