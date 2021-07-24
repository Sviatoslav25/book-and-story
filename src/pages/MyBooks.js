import React, { useState } from 'react';
import { Alert, Col, Container, Row, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import paths from '../router/paths';
import MockDataService from '../services/MockDataService';
import MyItemCard from '../components/MyItemCard/MyItemCard';
import { BOOKS } from '../constants/settings';
import useAddBook from '../hooks/useAddBook';
import useMyBooks from '../hooks/useMyBooks';

export default function MyBooks() {
  const [books, { loading: isLoading, error, refetch: refetchBooks }] = useMyBooks();
  const [addBook] = useAddBook({
    onCompleted: refetchBooks,
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const [isAdding, setIsAdding] = useState(false);
  return (
    <Container className="mt-3">
      <Button
        onClick={async () => {
          setIsAdding(true);
          await addBook({ variables: { input: MockDataService.createBook() } });
          setIsAdding(false);
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
