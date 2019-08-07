import React from 'react';
import { Error, CartHeader, Total, CartRow } from './components';
import { connect } from 'react-redux';
import shop from '../../../shop';
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

// function mapStateToProps(state) {
//   const cart = shop.selectors.getCartProducts(state);
//   const total = cart.reduce((result, { price, count }) => result + Number(price) * count, 0);

//   return { cart, total };
// }

const enhance = connect(state => {
  const cart = shop.selectors.getCartProducts(state);
  return {
    total: cart.reduce((result, { price, count }) => result + Number(price) * count, 0),
    cart: cart,
  };
});

export default enhance(Cart);
