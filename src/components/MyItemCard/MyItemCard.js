import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { generatePath, Link } from 'react-router-dom';
import { BOOKS } from '../../constants/settings';
import useAPIMethod from '../../hooks/useAPIMethod';
import APIService from '../../services/APIService';
import ButtonWithSpinner from '../common/ButtonWithSpinner';
import ModalDialogForDeleteItem from '../ModalDialogForDeleteItem/ModalDialogForDeleteItem';
import paths from '../../router/paths';

const storyImg =
  'https://images-platform.99static.com//4sAE0-g_qA0-XAYWunH9YKSpsQ8=/160x139:837x816/fit-in/500x500/99designs-contests-attachments/110/110993/attachment_110993584';

export default function MyItemCard({ item, refetchItems, nameItem }) {
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
          <ButtonWithSpinner
            loading={isDeleting}
            variant="outline-danger"
            onClick={() => {
              setIsVisibleModalDialog(true);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </ButtonWithSpinner>
          <Link to={generatePath(paths.editBook, { id: item._id })}>
            <ButtonWithSpinner className="ml-3" variant="outline-success">
              <FontAwesomeIcon icon={faEdit} />
            </ButtonWithSpinner>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
