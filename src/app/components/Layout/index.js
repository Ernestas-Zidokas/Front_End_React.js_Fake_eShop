import React from 'react';
import './index.scss';

function Layout({ children }) {
  return (
    <React.Fragment>
      <header>
        <h1>Hello from eShop</h1>
      </header>
      <main>{children}</main>
      <footer>
        <span>Footer</span>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
