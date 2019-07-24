import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './index.scss';

function Layout({ children }) {
  return (
    <div className="Layout">
      <Header />
      <main className="Main">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
