import React from 'react';
import { Products, Cart, Favorites, PageNotFound, SingleProduct } from './pages';
import { Layout, BackgroundColorProvider, ShopProvider } from './components';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ROUTES } from '../constants';
import './index.scss';

function App() {
  return (
    <ShopProvider>
      <BackgroundColorProvider>
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
      </BackgroundColorProvider>
    </ShopProvider>
  );
}

export default App;
