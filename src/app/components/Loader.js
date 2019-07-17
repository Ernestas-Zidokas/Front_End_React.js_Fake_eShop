import React from 'react';
import LoaderSpinner from 'react-loader-spinner';

const loaderProps = {
  type: 'Triangle',
  color: '#F50561',
  heigth: '100',
  weigth: '100',
};

function Loader() {
  return <LoaderSpinner {...loaderProps} />;
}

export default Loader;
