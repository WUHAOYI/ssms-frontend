import React from 'react';
import { Spinner } from 'react-mdl';

require('./loading-screen.scss');


function LoadingScreen() {
  return (
    <div className="loading-container">
      <Spinner singleColor />
    </div>
  );
}

export default LoadingScreen;
