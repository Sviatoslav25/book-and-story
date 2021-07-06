import React from 'react';
import { Spinner, Button } from 'react-bootstrap';

export default function ButtonWithSpinner({ loading, disable, children, ...rest }) {
  return (
    <Button {...rest} disabled={disable || loading}>
      {loading ? (
        <>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </>
      ) : null}
      {children}
    </Button>
  );
}
