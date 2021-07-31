import React from 'react';
import { Alert, Col, Container, Row, Button } from 'react-bootstrap';
import { BOOKS } from '../../constants/settings';
import useFavoritesBooks from '../../hooks/useFavoritesBooks';
import FavoritesItemsCard from './FavoritesItemsCard';

export default function FavoritesBooks({ switchToFavoritesStories }) {
  const [favoritesBooks, { loading: isLoading, error }] = useFavoritesBooks();

  if (isLoading && !favoritesBooks) {
    return <div>Loading...</div>;
  }

  if (error) {
    <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <>
      <Container className="mt-3">
        <Button onClick={switchToFavoritesStories}>Favorite Stories</Button>
      </Container>
      <Row>
        {favoritesBooks?.map((book) => {
          return (
            <Col key={book._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
              <FavoritesItemsCard nameItem={BOOKS} item={book} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
