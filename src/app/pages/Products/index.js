import React from 'react';
import { Loader } from '../../components';
import './index.scss';

function Products({ isLoading, error, products = [] }) {
  return (
    <div className="Products">
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {products.map(({ name, image, price, currencySymbol, description, id }) => (
        <div key={id} className="Product">
          <div className="Product--image">
            <img src={image} alt={`product ${name}`} />
          </div>
          <div className="Product--info">
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
          <div className="Product--cta">
            <p>
              <span>Price:</span> <span>{`${price}${currencySymbol}`}</span>
            </p>
            <div>
              <button type="button" onClick={() => console.log('Add to favourites', name)}>
                <span role="img" aria-label="favourite icon">
                  💜
                </span>
              </button>
              <button type="button" onClick={() => console.log('Add to cart', name)}>
                <span role="img" aria-label="favourite icon">
                  🛒
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
