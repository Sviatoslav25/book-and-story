import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { generatePath, Link } from 'react-router-dom';
import paths from '../../router/paths';
import useReadNoticeForBook from '../../hooks/useReadNoticeForBook';

export default function NoticeCard({ notice }) {
  const [readNoticeForBook] = useReadNoticeForBook({
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onReadNoticeForBook = (noticeId) => {
    readNoticeForBook({ variables: { noticeId } });
  };

  return (
    <Row>
      <Col className="mt-3">
        <Link
          onClick={() => {
            onReadNoticeForBook(notice._id);
          }}
          title="Read"
          to={generatePath(paths.book, { id: notice.bookId })}
          style={{ color: 'inherit', textDecoration: 'inherit' }}
        >
          <Card border={notice.isRead ? '' : 'success'}>
            <Card.Body style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
              <div>
                <Image
                  src={notice.book.img}
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
                    <strong>Book name:</strong> {notice.book.name}
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
