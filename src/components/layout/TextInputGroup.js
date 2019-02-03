import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function TextInputGroup(props) {
  const { label, name, value, placeholder, type, onChange, error } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextInputGroup.defaultProps = {
  type: 'text'
};

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TextInputGroup;
