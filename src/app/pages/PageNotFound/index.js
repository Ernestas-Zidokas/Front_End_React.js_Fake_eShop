import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import './index.scss';

function PageNotFound() {
  return (
    <div className="PageNotFound">
      <p>Page Not Found 404</p>
      <Link to={ROUTES.defaultPage}>Go Home!</Link>
    </div>
  );
}

export default PageNotFound;
