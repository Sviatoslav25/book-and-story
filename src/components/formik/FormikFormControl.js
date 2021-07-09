import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';
import FieldError from './FieldError';

const FormikFormControl = ({ type = 'text', name, placeholder, required, hideError, ...rest }) => {
  const [field, meta] = useField(name);
  const { onBlur, onChange, value } = field;
  const { error, touched } = meta;
  return (
    <>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        {...rest}
        isInvalid={touched && error}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {touched && error && !hideError && <FieldError>{error}</FieldError>}
    </>
  );
};

export default FormikFormControl;
