import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BackgroundContext from '../BackgroundContext';
import ShopContext from '../ShopContext';
import './index.scss';

function ProductCard({ id, image, name, description, price, currencySymbol }) {
  const { background, setBackground } = useContext(BackgroundContext);
  const { addToCart, toggleFavorite, removeFromCart, favorites, cart } = useContext(ShopContext);

  const isFavorite = favorites.some(itemId => itemId === id);
  const cartIndex = cart.findIndex(item => item.id === id);
  const cartCount = cartIndex > -1 ? cart[cartIndex].count : 0;

  const className = isFavorite ? 'ProductCard ProductCard__favorite' : 'ProductCard';
  const randomColor = () => setBackground('#' + ((Math.random() * 0xffffff) << 0).toString(16));

  return (
    <div style={{ background }} className={className}>
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
          <button type="button" onClick={randomColor}>
            Change color
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
