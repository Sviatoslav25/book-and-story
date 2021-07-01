import React, { useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { BOOKS } from '../../constants/settings';
import useAPIMethod from '../../hooks/useAPIMethod';
import APIService from '../../services/APIService';
import ModalDialogForDeleteItem from '../ModalDialogForDeleteItem/ModalDialogForDeleteItem';

const storyImg =
  'https://images-platform.99static.com//4sAE0-g_qA0-XAYWunH9YKSpsQ8=/160x139:837x816/fit-in/500x500/99designs-contests-attachments/110/110993/attachment_110993584';

export default function MyBookCard({ item, refetchItems, nameItem }) {
  const [isVisibleModalDialog, setIsVisibleModalDialog] = useState(false);
  const [deleteItem, isDeleting] = useAPIMethod({
    call: nameItem === BOOKS ? APIService.deleteBook : APIService.deleteStory,
    onComplete: refetchItems,
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const onDeleteItem = () => {
    deleteItem(item._id);
    setIsVisibleModalDialog(false);
  };

  return (
    <>
      <Card>
        {isVisibleModalDialog ? (
          <ModalDialogForDeleteItem
            show={isVisibleModalDialog}
            handleClose={setIsVisibleModalDialog}
            confirmed={onDeleteItem}
          />
        ) : null}
        <Card.Img alt={`${item.name} image`} variant="top" src={nameItem === BOOKS ? item.img : storyImg} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{nameItem === BOOKS ? item.description : item.shortDescription}</Card.Text>
        </Card.Body>
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
