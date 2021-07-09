import React from 'react';
import { ErrorMessage, FieldArray, useFormikContext } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import FormikFormControl from './FormikFormControl';
import FieldError from './FieldError';

export default function FormikInputArray({ name, label, formControlProps = {}, addItemButtonLabel = '+ Add' }) {
  const { values } = useFormikContext();
  const array = values[name];
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          {array.map((author, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Form.Group className="mb-3" key={index}>
              <InputGroup>
                <FormikFormControl name={`${name}.${index}`} required {...formControlProps} hideError />
                <InputGroup.Append>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => {
                      arrayHelpers.remove(index);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <ErrorMessage name={`${name}.${index}`} component={FieldError} />
            </Form.Group>
          ))}
          <Button
            block
            type="button"
            onClick={() => {
              arrayHelpers.push('');
            }}
          >
            {addItemButtonLabel}
          </Button>
        </Form.Group>
      )}
    />
  );
}
