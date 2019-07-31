import React from 'react';
import { Error, CartHeader, Total, CartRow } from './components';
import { connect } from 'react-redux';
import './index.scss';

function Cart({ cart, total }) {
  return (
    <div className="Cart">
      {!cart.length && <Error />}
      {!!cart.length && <CartHeader />}
      {cart.map(({ id, ...rest }) => (
        <CartRow key={id} {...rest} />
      ))}
      {!!cart.length && <Total total={total} />}
    </div>
  );
}

function mapStateToProps(state) {
  const { cart, products } = state.shop;

  const cartItems = cart.map(item => {
    const product = products.find(({ id }) => id === item.id);
    return { ...product, ...item };
  });

  const total = cartItems.reduce((result, { price, count }) => result + Number(price) * count, 0);

  return { cart: cartItems, total };
}

export default connect(mapStateToProps)(Cart);
