import React from 'react';
import PropTypes from 'prop-types';

function Button({ title, onDispatch }) {
  return (
    <button type="button" className="base-button" onClick={onDispatch}>
      {title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onDispatch: PropTypes.func.isRequired,
};

export default Button;
