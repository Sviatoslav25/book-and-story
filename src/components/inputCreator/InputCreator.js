import React from 'react';
import { Form } from 'react-bootstrap';

export default function InputCreator({ controlId, labelText, type, onChange, value }) {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{labelText}</Form.Label>
      <Form.Control type={type || 'text'} value={value} onChange={onChange} />
    </Form.Group>
  );
}
