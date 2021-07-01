import React from 'react';
import { Alert, Col, Container, Row, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAPIMethod from '../hooks/useAPIMethod';
import useAPIQuery from '../hooks/useAPIQuery';
import paths from '../router/paths';
import APIService from '../services/APIService';
import MockDataService from '../services/MockDataService';
import MyItemCard from '../components/MyItemCard/MyItemCard';
import { BOOKS } from '../constants/settings';

export default function MyBooks() {
  const [books, refetchBooks, isLoading, error] = useAPIQuery({ call: APIService.getCurrentUserBooks });
  const [addBook, isAdding] = useAPIMethod({
    call: APIService.addBook,
    onComplete: refetchBooks,
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return (
    <Container className="mt-3">
      <Button
        onClick={() => {
          addBook(MockDataService.createBook());
        }}
        disabled={isAdding}
      >
        {isAdding ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            <span className="sr-only">Loading...</span>
          </>
        ) : null}
        addBook(Random Data)
      </Button>
      <Link to={paths.addBook}>
        <Button>addBook</Button>
      </Link>
      {error && <Alert variant="danger">{error.message}</Alert>}
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <Row>
          {books?.map((book) => (
            <Col key={book._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
              <MyItemCard item={book} refetchItems={refetchBooks} nameItem={BOOKS} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
