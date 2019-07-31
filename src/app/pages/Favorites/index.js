import React from 'react';
import { ProductCard } from '../../components';
import { connect } from 'react-redux';
import './index.scss';

function Error() {
  return <p>Sorry, you don't have any favorited items!</p>;
}

function Favorites({ favorites, ...restProps }) {
  return (
    <div className="Favorites">
      {!favorites.length && <Error />}
      {favorites.map(data => {
        return <ProductCard key={data.id} {...data} {...restProps} />;
      })}
    </div>
  );
}

function mapStateToProps(state) {
  const { products, favorites } = state.shop;
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return { favorites: favoriteProducts };
}
export default connect(mapStateToProps)(Favorites);
