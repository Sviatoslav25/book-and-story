import React from 'react';
import { Form } from 'react-bootstrap';

export default function FormikFormGroup({ label, children }) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      {children}
    </Form.Group>
  );
}
