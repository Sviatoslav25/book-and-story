import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { generatePath, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PROFILE_PHOTO } from '../../constants/settings';
import useSubscribe from '../../hooks/useSubscribe';
import useUnsubscribe from '../../hooks/useUnsubscribe';
import paths from '../../router/paths';
import ButtonWithSpinner from '../common/ButtonWithSpinner';

export default function UserCard({ refetchUsers, user }) {
  const [subscribe, { loading: isSubscribing }] = useSubscribe({
    onCompleted: () => {
      refetchUsers();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const [unsubscribe, { loading: isUnsubscribing }] = useUnsubscribe({
    onCompleted: () => {
      refetchUsers();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onUnsubscribe = (authorId) => {
    unsubscribe({ variables: { authorId } });
  };

  const onSubscribe = (authorId) => {
    console.log(authorId);
    subscribe({ variables: { authorId } });
  };
  return (
    <Row key={user._id}>
      <Col className="mt-3">
        <Link
          to={generatePath(paths.userProfile, { id: user._id })}
          style={{ color: 'inherit', textDecoration: 'inherit' }}
        >
          <Card>
            <Card.Body style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
              <div>
                <Image
                  src={user.profilePhoto || PROFILE_PHOTO}
                  alt="Profile photo"
                  roundedCircle
                  style={{
                    maxWidth: '80px',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
                {user.isFollowed ? (
                  <ButtonWithSpinner
                    className="mt-2"
                    size="sm"
                    loading={isUnsubscribing}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      onUnsubscribe(user.userId);
                    }}
                  >
                    Unsubscribe
                  </ButtonWithSpinner>
                ) : (
                  <ButtonWithSpinner
                    className="mt-2"
                    size="sm"
                    loading={isSubscribing}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      onSubscribe(user.userId);
                    }}
                  >
                    Subscribe
                  </ButtonWithSpinner>
                )}
              </div>
              <div>
                <Card.Title>{user.nickname || user.email || 'none'}</Card.Title>
                <Card.Text>
                  <strong>About myself:</strong> {user.aboutMyself || 'none'}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </Row>
  );
}
