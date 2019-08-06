import React from 'react';
import { connect } from 'react-redux';
import { Loader, ProductCard } from '../../components';
import shop from '../../../shop';
import './index.scss';

function Products({ isLoading, error, products }) {
  return (
    <div className="Products">
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {products.map(data => {
        return <ProductCard {...data} key={data.id} />;
      })}
    </div>
  );
}

const enhance = connect(state => ({
  products: shop.selectors.getProducts(state),
  error: shop.selectors.getProductsError(state),
  isLoading: shop.selectors.isLoadingProducts(state),
}));

export default enhance(Products);
