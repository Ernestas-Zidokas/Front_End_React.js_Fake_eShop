import React from 'react';
import './index.scss';

function Cart({ cart, products }) {
  const cartItems = cart.map(item => {
    const product = products.find(({ id }) => id === item.id);
    return { ...product, ...item };
  });

  const total = cartItems.reduce((result, { price, count }) => result + Number(price) * count, 0);

  return (
    <div className="Cart">
      {!cart.length && <p>Sorry, you don't have any items in your Cart!</p>}
      {!!cartItems.length && (
        <div className="Cart--header">
          <label>Product:</label>
          <label>Price:</label>
        </div>
      )}
      {cartItems.map(({ id, name, price, currencySymbol, count }) => {
        return (
          <div className="Cart--item" key={id}>
            <span>
              {name} x {count}
            </span>
            <span>
              {price * count}
              {currencySymbol}
            </span>
          </div>
        );
      })}
      {!!cartItems.length && (
        <div className="Cart--total">
          <label>Total:</label> {total}
        </div>
      )}
    </div>
  );
}

export default Cart;
