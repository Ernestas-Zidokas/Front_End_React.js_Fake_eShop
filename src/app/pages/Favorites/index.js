import React from 'react';
import { ProductCard } from '../../components';
import { connect } from 'react-redux';
import shop from '../../../shop';
import './index.scss';

function Error() {
  return <p>Sorry, you don't have any favorited items!</p>;
}

function Favorites({ favorites }) {
  return (
    <div className="Favorites">
      {!favorites.length && <Error />}
      {favorites.map(data => {
        return <ProductCard key={data.id} {...data} />;
      })}
    </div>
  );
}

const enhance = connect(state => ({
  favorites: shop.selectors.getFavoriteProducts(state),
}));

export default enhance(Favorites);
