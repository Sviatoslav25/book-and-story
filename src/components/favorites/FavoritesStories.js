import React from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { STORIES } from '../../constants/settings';
import useFavoritesStories from '../../hooks/useFavoritesStories';
import FavoritesItemsCard from './FavoritesItemsCard';

export default function FavoritesStories({ switchToFavoritesBooks }) {
  const [favoritesStories, { loading: isLoading, error }] = useFavoritesStories();

  if (isLoading && !favoritesStories) {
    return <div>Loading...</div>;
  }

  if (error) {
    <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <>
      <Container className="mt-3">
        <Button onClick={switchToFavoritesBooks}>Favorite Books</Button>
      </Container>
      <Row>
        {favoritesStories?.map((story) => {
          return (
            <Col key={story._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
              <FavoritesItemsCard nameItem={STORIES} item={story} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
