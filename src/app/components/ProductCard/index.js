import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

function ProductCard({
  id,
  image,
  name,
  description,
  price,
  currencySymbol,
  isFavorite,
  cartCount,
  addToCart,
  toggleFavorite,
  removeFromCart,
}) {
  const className = isFavorite ? 'ProductCard ProductCard__favorite' : 'ProductCard';
  return (
    <div className={className}>
      <div className="ProductCard--image">
        <Link to={`/product/${id}`}>
          <img src={image} alt={`product ${name}`} />
        </Link>
      </div>
      <div className="ProductCard--info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="ProductCard--cta">
        <p>
          <span>Price:</span> <span>{`${price}${currencySymbol}`}</span>
        </p>
        <div>
          <button type="button" onClick={() => toggleFavorite(id)}>
            <span role="img" aria-label="favourite icon">
              {isFavorite ? '❌' : '💜'}
            </span>
          </button>
          {!!cartCount && (
            <button type="button" onClick={() => removeFromCart(id)}>
              <span role="img" aria-label="Wastebasket icon">
                🗑️
              </span>
            </button>
          )}
          <button type="button" onClick={() => addToCart(id)}>
            <span role="img" aria-label="cart icon">
              🛒
            </span>
            {!!cartCount && <div className="ProductCard--cta-count">{cartCount}</div>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
