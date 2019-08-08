import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { Loader, ShopContext } from '../../components';
import './index.scss';

function SingleProduct({ history, match: { params } }) {
  const { products, loading } = useContext(ShopContext);
  const product = products.find(product => product.id === params.id);

  if (!product && !loading) {
    return <Redirect to={ROUTES.defaultPage} />;
  }

  if (loading) {
    return <Loader />;
  }
  const { name, image, description, price, currencySymbol } = product;
  const onClick = () => history.push(ROUTES.cart);

  return (
    <div className="SingleProduct">
      <img src={image} alt={`product: ${name}`} />
      <p>
        {name} - {price}
        {currencySymbol}
      </p>
      <p>{description}</p>
      <button type="button" onClick={onClick}>
        Go to Cart
      </button>
    </div>
  );
}

export default SingleProduct;
