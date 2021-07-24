import { useField } from 'formik';
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import style from './FormikFormCheck.module.scss';

export default function FormikFormCheck({ label, name }) {
  const [field, , helpers] = useField(name);
  const { setValue } = helpers;
  const { onBlur, value } = field;
  return (
    <Form.Group>
      <InputGroup>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          size="sm"
          className={style.check}
          style={{ width: '20px' }}
          onBlur={onBlur}
          onClick={(e) => {
            setValue(e.target.checked);
          }}
          defaultChecked={value}
          value={value}
          type="checkbox"
          // label={label}
        />
      </InputGroup>

      {/* <Form.Check
        onBlur={onBlur}
        onClick={(e) => {
          setValue(e.target.checked);
        }}
        value={value}
        type="checkbox"
        label={label}
        feedbackTooltip={value}
      /> */}
    </Form.Group>
  );
}
