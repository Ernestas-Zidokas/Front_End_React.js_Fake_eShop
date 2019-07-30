import React from 'react';

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

export default CartRow;
