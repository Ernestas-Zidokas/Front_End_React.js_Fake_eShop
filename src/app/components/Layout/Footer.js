import React from 'react';
import './index.scss';

function Footer() {
  return (
    <footer className="Footer">© Copyright by React Students | {new Date().getFullYear()}</footer>
  );
}

export default Footer;
