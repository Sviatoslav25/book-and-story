import React from 'react';
import { Alert, Col, Container, Row, Button } from 'react-bootstrap';
import { STORIES } from '../../constants/settings';
import useUserStories from '../../hooks/useUserStories';
import ItemsCardWithoutChangeRating from '../itemCard/ItemsCardWithoutChangeRating';

export default function UserStories({ switchToUserBooks, userId }) {
  const [userStories, { loading: isLoading, error }] = useUserStories(userId);

  if (isLoading && !userStories) {
    return <div>Loading...</div>;
  }

  if (error) {
    <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <>
      <Container className="mt-3">
        <Button onClick={switchToUserBooks}>Books</Button>
      </Container>
      <Row>
        {userStories?.map((story) => {
          return (
            <Col key={story._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
              <ItemsCardWithoutChangeRating nameItem={STORIES} item={story} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
