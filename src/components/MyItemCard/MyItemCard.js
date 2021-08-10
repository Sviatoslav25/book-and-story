import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { Card, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { generatePath, Link } from 'react-router-dom';
import { BOOKS } from '../../constants/settings';
import style from './MyItemCard.module.scss';
import ButtonWithSpinner from '../common/ButtonWithSpinner';
import paths from '../../router/paths';
import ModalDialog from '../ModalDialog/ModalDialog';
import useDeleteItem from '../../hooks/useDeleteItem';
import useChangePrivacyOfItem from '../../hooks/useChangePrivacyOfItem';

const storyImg =
  'https://images-platform.99static.com//4sAE0-g_qA0-XAYWunH9YKSpsQ8=/160x139:837x816/fit-in/500x500/99designs-contests-attachments/110/110993/attachment_110993584';

export default function MyItemCard({ item, refetchItems, nameItem }) {
  const [isVisibleModalDialogToDelete, setIsVisibleModalDialogToDelete] = useState(false);
  const [isVisibleModalDialogToChangePrivacy, setIsVisibleModalDialogToChangePrivacy] = useState(false);
  const [deleteItem, { loading: isDeleting }] = useDeleteItem(nameItem, {
    onCompleted: refetchItems,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const [changePrivacyOfItem, { loading: isChangingPrivacy }] = useChangePrivacyOfItem(nameItem, {
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
    setIsVisibleModalDialogToDelete(false);
  };

  const onChangePrivacyOfItem = () => {
    if (nameItem === BOOKS) {
      changePrivacyOfItem({ variables: { isPrivate: !item.isPrivate, bookId: item._id } });
    } else {
      changePrivacyOfItem({ variables: { isPrivate: !item.isPrivate, storyId: item._id } });
    }
    setIsVisibleModalDialogToChangePrivacy(false);
  };

  return (
    <>
      <Card bg={item.isPrivate ? 'danger' : ''}>
        {isVisibleModalDialogToDelete ? (
          <ModalDialog
            show={isVisibleModalDialogToDelete}
            handleClose={setIsVisibleModalDialogToDelete}
            confirmed={onDeleteItem}
            headerText="Confirm deletion"
            bodyText={`Are you sure that you want to delete this ${nameItem === BOOKS ? 'book' : 'story'}?`}
            confirmButtonText="Delete"
          />
        ) : null}
        {isVisibleModalDialogToChangePrivacy ? (
          <ModalDialog
            show={isVisibleModalDialogToChangePrivacy}
            handleClose={setIsVisibleModalDialogToChangePrivacy}
            confirmed={onChangePrivacyOfItem}
            headerText="Confirm"
            bodyText={`Are you sure that you want to make this ${nameItem === BOOKS ? 'book' : 'story'} ${
              item.isPrivate ? 'public' : 'private'
            }?`}
            confirmButtonText="Yes"
            closeButtonText="No"
          />
        ) : null}
        <Link
          to={generatePath(nameItem === BOOKS ? paths.book : paths.story, { id: item._id })}
          className={style.linkStyle}
        >
          <Card.Img
            title="Open details"
            style={{ cursor: 'pointer' }}
            alt={`${item.name} image`}
            variant="top"
            src={nameItem === BOOKS ? item.img : storyImg}
          />
        </Link>
        <Card.Body>
          <Card.Title className={style.cardTitle}>
            {item.name}
            {isChangingPrivacy ? (
              <Spinner className={style.lockIcon} animation="border" variant="secondary" />
            ) : (
              <FontAwesomeIcon
                onClick={() => {
                  setIsVisibleModalDialogToChangePrivacy(true);
                }}
                className={style.lockIcon}
                icon={item.isPrivate ? faLock : faUnlock}
              />
            )}
          </Card.Title>
          <Card.Text>{nameItem === BOOKS ? item.description : item.shortDescription}</Card.Text>
          <ButtonWithSpinner
            variant="outline-primary"
            loading={isDeleting}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              setIsVisibleModalDialogToDelete(true);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </ButtonWithSpinner>
          <Link to={generatePath(nameItem === BOOKS ? paths.editBook : paths.editStory, { id: item._id })}>
            <ButtonWithSpinner style={{ marginLeft: '20px' }} variant="outline-success">
              <FontAwesomeIcon icon={faEdit} />
            </ButtonWithSpinner>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
