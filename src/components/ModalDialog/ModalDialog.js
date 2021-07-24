import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function ModalDialog({
  show,
  handleClose,
  confirmed,
  headerText = 'Confirm',
  bodyText = '',
  closeButtonText = 'Close',
  confirmButtonText = 'Confirm',
}) {
  const onClose = () => {
    handleClose(false);
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyText}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {closeButtonText}
        </Button>
        <Button variant="danger" onClick={confirmed}>
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
