import React, { useState } from 'react';
import { Products, Cart, Favorites, PageNotFound, SingleProduct } from './pages';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from './components';
import { ROUTES } from '../constants';
import { useFetch } from './hooks';
import { toggleArrayItem } from './util';
import store from './state';
import './index.scss';

function onError() {
  return 'Ooops! Something went wrong ⚰️';
}

function onSuccess(payload) {
  store.dispatch({ type: 'SET_PRODUCTS', payload: payload });

  return payload;
}

function App() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const { loading: isLoading, products, error } = useFetch({
    onError,
    onSuccess,
    src: 'https://boiling-reaches-93648.herokuapp.com/food-shop/products',
    initialState: [],
    dataKey: 'products',
  });

  const toggleFavorite = id => {
    setFavorites(toggleArrayItem(favorites, id));
  };

  const addToCart = id => {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      setCart(cart.map((item, i) => (i === itemIndex ? { ...item, count: item.count + 1 } : item)));
    } else {
      setCart([...cart, { id, count: 1 }]);
    }
  };

  // const removeFromCart = id => {
  //   setCart(cart.filter(item => item.id !== id));
  // };

  const removeFromCart = removeId => {
    const itemIndex = cart.findIndex(({ id }) => id === removeId);

    if (itemIndex > -1) {
      setCart(
        cart
          .map((cartItem, i) =>
            i === itemIndex ? { ...cartItem, count: cartItem.count - 1 } : cartItem,
          )
          .filter(item => item.count > 0),
      );
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route
              path={ROUTES.defaultPage}
              exact
              render={() => (
                <Products
                  toggleFavorite={toggleFavorite}
                  addToCart={addToCart}
                  favorites={favorites}
                  cart={cart}
                  isLoading={isLoading}
                  error={error}
                  removeFromCart={removeFromCart}
                />
              )}
            />
            <Route
              path={ROUTES.cart}
              exact
              render={() => <Cart cart={cart} products={products} />}
            />
            <Route
              path={ROUTES.favorites}
              exact
              render={() => (
                <Favorites
                  toggleFavorite={toggleFavorite}
                  cart={cart}
                  addToCart={addToCart}
                  favorites={favorites}
                  products={products}
                  removeFromCart={removeFromCart}
                />
              )}
            />
            <Route
              path={ROUTES.product}
              exact
              render={props => {
                const { id } = props.match.params;
                const product = products.find(product => product.id === id);
                return <SingleProduct {...props} product={product} isLoading={isLoading} />;
              }}
            />
            <Redirect exact from={ROUTES.home} to={ROUTES.defaultPage} />
            <Route component={PageNotFound} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
