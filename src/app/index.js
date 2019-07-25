import React from 'react';
import { Products, Cart, Favorites, PageNotFound, SingleProduct } from './pages';
import { Layout } from './components';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ROUTES } from '../constants';
import './index.scss';

class App extends React.Component {
  state = {
    products: [],
    favorites: [],
    cart: [],
    isLoading: true,
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await fetch('https://boiling-reaches-93648.herokuapp.com/food-shop/products');
    if (response.ok) {
      const json = await response.json();
      this.setState({ products: json, isLoading: false });
    } else {
      this.setState({ error: 'Ooops! Something went wrong ⚰️', isLoading: false });
    }
  }

  toggleFavorite = id => {
    const { favorites } = this.state;

    if (favorites.includes(id)) {
      this.setState({ favorites: favorites.filter(favoriteId => favoriteId !== id) });
    } else {
      this.setState({ favorites: [...favorites, id] });
    }
  };

  addToCart = addId => {
    this.setState(state => {
      const itemIndex = state.cart.findIndex(({ id }) => id === addId);

      if (itemIndex > -1) {
        return {
          cart: state.cart.map((cartItem, i) =>
            i === itemIndex ? { ...cartItem, count: cartItem.count + 1 } : cartItem,
          ),
        };
      }

      return { cart: [...state.cart, { id: addId, count: 1 }] };
    });
  };

  // removeFromCart = removeId => {
  //   this.setState(state => {
  //     return {
  //       cart: state.cart.filter(({ id }) => id !== removeId),
  //     };
  //   });
  // };

  removeFromCart = removeId => {
    this.setState(state => {
      const itemIndex = state.cart.findIndex(({ id }) => id === removeId);
      const { count } = state.cart[itemIndex];

      if (itemIndex > -1) {
        if (count > 1) {
          return {
            cart: state.cart.map((cartItem, i) =>
              i === itemIndex ? { ...cartItem, count: cartItem.count - 1 } : cartItem,
            ),
          };
        } else {
          return { cart: state.cart.filter(({ id }) => id !== removeId) };
        }
      }
    });
  };

  render() {
    const { products, isLoading, error, favorites, cart } = this.state;

    return (
      <Router>
        <Layout>
          <Switch>
            <Route
              path={ROUTES.defaultPage}
              exact
              render={() => (
                <Products
                  toggleFavorite={this.toggleFavorite}
                  addToCart={this.addToCart}
                  favorites={favorites}
                  products={products}
                  cart={cart}
                  isLoading={isLoading}
                  error={error}
                  removeFromCart={this.removeFromCart}
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
                  toggleFavorite={this.toggleFavorite}
                  cart={cart}
                  addToCart={this.addToCart}
                  favorites={favorites}
                  products={products}
                  removeFromCart={this.removeFromCart}
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
    );
  }
}

export default App;
