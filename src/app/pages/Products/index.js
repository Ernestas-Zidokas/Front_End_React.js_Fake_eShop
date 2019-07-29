import React from 'react';
import { Loader, ProductCard } from '../../components';
import './index.scss';

function Products({ isLoading, error, products = [], favorites, cart, ...restProps }) {
  return (
    <div className="Products">
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {products.map(data => {
        const { count = 0 } = cart.find(({ id }) => id === data.id) || {};

        return (
          <ProductCard
            {...restProps}
            {...data}
            key={data.id}
            isFavorite={favorites.includes(data.id)}
            cartCount={count}
          />
        );
      })}
    </div>
  );
}

export default Products;
