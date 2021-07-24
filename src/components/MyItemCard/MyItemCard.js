import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { generatePath, Link } from 'react-router-dom';
import { BOOKS } from '../../constants/settings';
import ButtonWithSpinner from '../common/ButtonWithSpinner';
import paths from '../../router/paths';
import ModalDialog from '../ModalDialog/ModalDialog';
import useDeleteItem from '../../hooks/useDeleteItem';

const storyImg =
  'https://images-platform.99static.com//4sAE0-g_qA0-XAYWunH9YKSpsQ8=/160x139:837x816/fit-in/500x500/99designs-contests-attachments/110/110993/attachment_110993584';

export default function MyItemCard({ item, refetchItems, nameItem }) {
  const [isVisibleModalDialog, setIsVisibleModalDialog] = useState(false);
  const [deleteItem, { loading: isDeleting }] = useDeleteItem(nameItem, {
    onCompleted: refetchItems,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onDeleteItem = () => {
    if (nameItem === BOOKS) {
      deleteItem({ variables: { bookId: item._id } });
    } else {
      deleteItem({ variables: { storyId: item._id } });
    }
    setIsVisibleModalDialog(false);
  };

  return (
    <>
      <Card>
        {isVisibleModalDialog ? (
          <ModalDialog
            show={isVisibleModalDialog}
            handleClose={setIsVisibleModalDialog}
            confirmed={onDeleteItem}
            headerText="Confirm deletion"
            bodyText="Are you sure that you want to delete this element?"
            confirmButtonText="Delete"
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
          <Link to={generatePath(nameItem === BOOKS ? paths.editBook : paths.editStory, { id: item._id })}>
            <ButtonWithSpinner className="ml-3" variant="outline-success">
              <FontAwesomeIcon icon={faEdit} />
            </ButtonWithSpinner>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
