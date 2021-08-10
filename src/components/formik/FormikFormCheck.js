import { useField } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';

export default function FormikFormCheck({ label, name }) {
  const [field, , helpers] = useField(name);
  const { setValue } = helpers;
  const { onBlur, value } = field;
  return (
    <Form.Group>
      <Form.Label className="form-check-label">{label}</Form.Label>
      <Form.Check
        onBlur={onBlur}
        onClick={(e) => {
          setValue(e.target.checked);
        }}
        defaultChecked={value}
        value={value}
      />
    </Form.Group>
  );
}
