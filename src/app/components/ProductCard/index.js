import React from 'react';
import { connect } from 'react-redux';
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
          <button type="button" onClick={toggleFavorite}>
            <span role="img" aria-label="favourite icon">
              {isFavorite ? '❌' : '💜'}
            </span>
          </button>
          {!!cartCount && (
            <button type="button" onClick={removeFromCart}>
              <span role="img" aria-label="Wastebasket icon">
                🗑️
              </span>
            </button>
          )}
          <button type="button" onClick={() => addToCart(cartCount)}>
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

function mapStateToProps(state, props) {
  const { cart, favorites } = state.shop;
  const item = cart.find(({ id }) => id === props.id);

  return {
    cartCount: item ? item.count : 0,
    isFavorite: favorites.includes(props.id),
  };
}

function mapDispatchToProps(dispatch, { id }) {
  return {
    addToCart: count =>
      dispatch({
        type: 'ADD_TO_CART',
        payload: { id, count: count + 1 },
      }),
    removeFromCart: () =>
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: id,
      }),
    toggleFavorite: () =>
      dispatch({
        type: 'TOGGLE_FAVORITE',
        payload: id,
      }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductCard);
