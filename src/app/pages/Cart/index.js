import React from 'react';
import './index.scss';

function Error() {
  return <p>Sorry, you don't have any items in your Cart!</p>;
}

function CartHeader() {
  return (
    <div className="Cart--header">
      <label>Product:</label>
      <label>Price:</label>
    </div>
  );
}

function Total({ total }) {
  return (
    <div className="Cart--total">
      <label>Total:</label> {total}
    </div>
  );
}

function CartRow({ name, price, count, currencySymbol }) {
  return (
    <div className="Cart--item">
      <span>
        {name} x {count}
      </span>
      <span>
        {price * count}
        {currencySymbol}
      </span>
    </div>
  );
}

function Cart({ cart, products }) {
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
