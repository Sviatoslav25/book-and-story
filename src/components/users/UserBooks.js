import React from 'react';
import { Alert, Col, Container, Row, Button } from 'react-bootstrap';
import { BOOKS } from '../../constants/settings';
import useUserBooks from '../../hooks/useUserBooks';
import ItemsCardWithoutChangeRating from '../itemCard/ItemsCardWithoutChangeRating';

export default function UserBooks({ switchToUserStories, userId }) {
  const [userBooks, { loading: isLoading, error }] = useUserBooks(userId);

  if (isLoading && !userBooks) {
    return <div>Loading...</div>;
  }

  if (error) {
    <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <>
      <Container className="mt-3">
        <Button onClick={switchToUserStories}>Stories</Button>
      </Container>
      <Row>
        {userBooks?.map((book) => {
          return (
            <Col key={book._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
              <ItemsCardWithoutChangeRating nameItem={BOOKS} item={book} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
