import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function ModalDialogForDeleteItem({ show, handleClose, confirmed }) {
  const onClose = () => {
    handleClose(false);
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure that you want to delete this element?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={confirmed}>
          delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
