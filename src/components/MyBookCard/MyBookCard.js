import React, { useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useAPIMethod from '../../hooks/useAPIMethod';
import APIService from '../../services/APIService';
import ModalDialogForDeleteItem from '../ModalDialogForDeleteItem/ModalDialogForDeleteItem';

export default function MyBookCard({ book, refetchBooks }) {
  const [isVisibleModalDialog, setIsVisibleModalDialog] = useState(false);
  const [deleteBook, isDeleting] = useAPIMethod({
    call: APIService.deleteBook,
    onComplete: refetchBooks,
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const onDeleteBook = () => {
    deleteBook(book._id);
    setIsVisibleModalDialog(false);
  };

  return (
    <>
      <Card>
        {isVisibleModalDialog ? (
          <ModalDialogForDeleteItem
            show={isVisibleModalDialog}
            handleClose={setIsVisibleModalDialog}
            confirmed={onDeleteBook}
          />
        ) : null}
        <Card.Img alt={`${book.name} image`} variant="top" src={book.img} />
        <Card.Body>
          <Card.Title>{book.name}</Card.Title>
          <Card.Text>{book.description}</Card.Text>
        </Card.Body>
        <Button>Change</Button>
        <Button
          disabled={isDeleting}
          variant="danger"
          onClick={() => {
            setIsVisibleModalDialog(true);
          }}
        >
          {isDeleting ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </>
          ) : null}
          delete
        </Button>
      </Card>
    </>
  );
}
