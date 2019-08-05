import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import shop from '../../../shop';
import { ROUTES } from '../../../constants';
import './index.scss';

// HOC (Higher order component) example
function withHoc(Component) {
  function WrappedComponent(props) {
    return <Component {...props} text="Amazing" />;
  }

  return WrappedComponent;
}

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
  history,
  text,
}) {
  const className = isFavorite ? 'ProductCard ProductCard__favorite' : 'ProductCard';
  const completePurchase = () => history.push(ROUTES.cart);

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
          <button type="button" onClick={() => addToCart({ id, count: cartCount + 1 })}>
            <span role="img" aria-label="cart icon">
              🛒
            </span>
            {!!cartCount && <div className="ProductCard--cta-count">{cartCount}</div>}
          </button>
          <button type="button" onClick={() => completePurchase()}>
            {text}
          </button>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, { id }) {
  const item = shop.selectors.getCartItem(state, id);

  return {
    cartCount: item ? item.count : 0,
    isFavorite: shop.selectors.isProductFavorite(state, id),
  };
}

const enhance = compose(
  withHoc,
  withRouter,
  connect(
    mapStateToProps,
    dispatch =>
      bindActionCreators(
        {
          addToCart: shop.actions.addToCart,
          removeFromCart: shop.actions.removeFromCart,
          toggleFavorite: shop.actions.toggleFavorite,
        },
        dispatch,
      ),
  ),
);

export default enhance(ProductCard);
