import React, { useContext } from 'react';
import { Error, CartHeader, Total, CartRow } from './components';
import { ShopContext } from '../../components';
import './index.scss';

function Cart() {
  const { products, cart } = useContext(ShopContext);

  const cartItems = cart.map(item => {
    const product = products.find(({ id }) => id === item.id);
    return { ...product, ...item };
  });

  const total = cartItems.reduce((result, { price, count }) => result + Number(price) * count, 0);

  return (
    <div className="Cart">
      {!cart.length && <Error />}
      {!!cartItems.length && <CartHeader />}
      {cartItems.map(({ id, ...rest }) => (
        <CartRow key={id} {...rest} />
      ))}
      {!!cartItems.length && <Total total={total} />}
    </div>
  );
}

export default Cart;
