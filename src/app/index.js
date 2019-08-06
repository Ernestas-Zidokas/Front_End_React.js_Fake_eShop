import React, { useEffect } from 'react';
import { Products, Cart, Favorites, PageNotFound, SingleProduct } from './pages';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from './components';
import { ROUTES } from '../constants';
import store from './state';
import shop from '../shop';
import './index.scss';

function App() {
  useEffect(() => {
    store.dispatch(shop.actions.getProducts());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route path={ROUTES.defaultPage} exact component={Products} />
            <Route path={ROUTES.cart} exact component={Cart} />
            <Route path={ROUTES.favorites} exact component={Favorites} />
            <Route path={ROUTES.product} exact component={SingleProduct} />
            <Redirect exact from={ROUTES.home} to={ROUTES.defaultPage} />
            <Route component={PageNotFound} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
