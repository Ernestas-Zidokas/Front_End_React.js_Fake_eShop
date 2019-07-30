import React from 'react';

function Total({ total }) {
  return (
    <div className="Cart--total">
      <label>Total:</label> {total}
    </div>
  );
}

export default Total;
