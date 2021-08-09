import React from 'react';
import { Card, Col, Image, Row, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { generatePath, Link } from 'react-router-dom';
import paths from '../../router/paths';
import useReadNotice from '../../hooks/useReadNotice';
import NoticeManager from '../../services/NoticeManager';
import useRemoveNotice from '../../hooks/useRemoveNotice';
import { BOOKS, STORY_PICTURE } from '../../constants/settings';
import ButtonWithSpinner from '../common/ButtonWithSpinner';

export default function NoticeCard({ notice, refetch, nameItem }) {
  const [readNoticeForBook] = useReadNotice(nameItem, {
    onError: (e) => {
      toast.error(e.message);
    },
    onCompleted: () => {
      NoticeManager.noticeQuantityChange();
    },
  });

  const [removeNotice, { loading: isRemoving }] = useRemoveNotice(nameItem, {
    onError: (e) => {
      toast.error(e.message);
    },
    onCompleted: () => {
      refetch();
      NoticeManager.noticeQuantityChange();
    },
  });

  const onRemoveNotice = (noticeId) => {
    removeNotice({ variables: { noticeId } });
  };

  const onReadNoticeForBook = (noticeId) => {
    readNoticeForBook({ variables: { noticeId } });
  };
  if (notice?.book?.isPrivate || notice?.story?.isPrivate) {
    return (
      <Row>
        <Col className="mt-3">
          <Card>
            <Card.Body>
              <Card.Title>{nameItem === BOOKS ? 'Book' : 'Story'} is Private</Card.Title>
              <Card.Text>
                <strong>Author:</strong> {notice.author.nickname || notice.author.email || 'none'}
              </Card.Text>
              <ButtonWithSpinner
                loading={isRemoving}
                onClick={() => {
                  onRemoveNotice(notice._id);
                }}
                variant="danger"
              >
                Remove notice
              </ButtonWithSpinner>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col className="mt-3">
        <Link
          onClick={() => {
            onReadNoticeForBook(notice._id);
          }}
          title="Read"
          to={generatePath(nameItem === BOOKS ? paths.book : paths.story, {
            id: nameItem === BOOKS ? notice.bookId : notice.storyId,
          })}
          style={{ color: 'inherit', textDecoration: 'inherit' }}
        >
          <Card border={notice.isRead ? '' : 'success'}>
            <div title="remove" style={{ marginTop: '-12px', marginRight: '-8px' }}>
              {isRemoving ? (
                <Spinner style={{ float: 'right', color: 'gray' }} animation="border" variant="secondary" />
              ) : (
                <FontAwesomeIcon
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    onRemoveNotice(notice._id);
                  }}
                  style={{ float: 'right', color: 'gray' }}
                  size="lg"
                  icon={faTimes}
                />
              )}
            </div>
            <Card.Body style={{ marginTop: '-6px', display: 'grid', gridTemplateColumns: '100px 1fr' }}>
              <div>
                <Image
                  src={nameItem === BOOKS ? notice.book.img : STORY_PICTURE}
                  alt="Profile photo"
                  roundedCircle
                  style={{
                    maxWidth: '80px',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div>
                <Card.Title style={{ display: 'grid', gridTemplateColumns: '1fr 20px' }}>
                  <div>
                    {nameItem === BOOKS ? <strong>Book name:</strong> : <strong>Story name:</strong>}{' '}
                    {nameItem === BOOKS ? notice.book.name : notice.story.name}
                  </div>
                  {!notice.isRead && <FontAwesomeIcon size="lg" color="green" icon={faExclamationCircle} />}
                </Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {notice.author.nickname || notice.author.email || 'none'}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </Row>
  );
}
