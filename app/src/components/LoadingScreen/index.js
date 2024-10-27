import React, { PropTypes } from 'react';
import { Spinner } from 'react-mdl';

require('./loading-screen.scss');

function LoadingScreen({ containerProps = {} }) {
  return (
    <div className="loading-container" {...containerProps}>
      <Spinner singleColor />
    </div>
  );
}

LoadingScreen.propTypes = {
  containerProps: PropTypes.object,
};

export default LoadingScreen;
