import React from 'react';
import { ProductCard } from '../../components';
import './index.scss';

function Error(params) {
  return <p>Sorry, you don't have any favorited items!</p>;
}

function Favorites({ favorites, products = [], cart, ...restProps }) {
  const favoriteProducts = products.filter(product => favorites.includes(product.id));
  return (
    <div className="Favorites">
      {!favoriteProducts.length && <Error />}
      {favoriteProducts.map(data => {
        const { count = 0 } = cart.find(({ id }) => id === data.id) || {};
        return <ProductCard isFavorite key={data.id} {...data} cartCount={count} {...restProps} />;
      })}
    </div>
  );
}

export default Favorites;
