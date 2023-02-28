import React from 'react';
import PropTypes from 'prop-types';

function Button({ title, onDispatch }) {
  return (
    <button type="button" onClick={onDispatch}>
      {title}
    </button>
  );
}

Button.defaultProps = {
  onDispatch: ()=>console.log('test')
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Button;
