import React, { useContext } from 'react';
import { ProductCard, ShopContext } from '../../components';
import './index.scss';

function Error() {
  return <p>Sorry, you don't have any favorited items!</p>;
}

function Favorites() {
  const { products, favorites } = useContext(ShopContext);
  const favoriteProducts = products.filter(product => favorites.includes(product.id));
  return (
    <div className="Favorites">
      {!favoriteProducts.length && <Error />}
      {favoriteProducts.map(data => (
        <ProductCard key={data.id} {...data} />
      ))}
    </div>
  );
}

export default Favorites;
