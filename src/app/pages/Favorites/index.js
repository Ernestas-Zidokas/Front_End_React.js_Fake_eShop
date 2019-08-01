import React from 'react';
import { ProductCard } from '../../components';
import { connect } from 'react-redux';
import shop from '../../../shop';
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
  return { favorites: shop.selectors.getFavoriteProducts(state) };
}
export default connect(mapStateToProps)(Favorites);
