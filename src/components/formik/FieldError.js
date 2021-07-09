import React from 'react';

export default function FieldError({ children }) {
  return (
    <div>
      <small className="text-danger">{children}</small>
    </div>
  );
}
