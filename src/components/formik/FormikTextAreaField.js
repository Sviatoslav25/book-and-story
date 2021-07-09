import React from 'react';
import FormikFormControl from './FormikFormControl';

export default function FormikTextAreaField(props) {
  return <FormikFormControl as="textarea" rows={5} {...props} />;
}
