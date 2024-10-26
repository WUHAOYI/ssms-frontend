import React, { PropTypes } from 'react';
import classNames from 'classnames';

require('./ssms-button.scss');

function SSMSButton({
  children,
  onClick,
  active,
  className = '',
  size = 'small',
  buttonType = 'primary',
  ...otherProps
}) {
  const classes = classNames({
    'ssms-button': true,
    [size]: true,
    [buttonType]: true,
    [className]: true,
    active,
  });

  return (
    <button className={classes} onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
}

SSMSButton.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  buttonType: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SSMSButton;
