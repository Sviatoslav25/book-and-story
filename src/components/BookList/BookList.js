import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import paths from '../../router/paths';
import MockDataService from '../../services/MockDataService';
import BookCard from '../book/BookCard';
import style from './BookList.module.scss';

export default function BookList({ switchToStories }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    fetchBook();
  }, []);

  function fetchBook() {
    setIsLoading(true);
    return axios
      .get('/api/books/all')
      .then((resolve) => {
        setBooks(resolve.data);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const addBook = () => {
    const book = MockDataService.createBook();
    setIsAdding(true);
    axios
      .post('/api/books/create', book)
      .then(() => {
        return fetchBook();
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => {
        setIsAdding(false);
      });
  };

  return (
    <>
      <Container className="mt-3">
        <Button onClick={switchToStories}>Stories</Button>
        <Button className={style.addButton} onClick={addBook} disabled={isAdding}>
          {isAdding ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </>
          ) : null}
          addBook(Random Data)
        </Button>
        <Link to={paths.addBook}>
          <Button className={style.addButton}>addBook</Button>
        </Link>
      </Container>

      {error ? <Alert variant="danger">{error}</Alert> : null}
      {isLoading && !books.length ? <>Loading...</> : null}
      {books.map((book) => {
        return (
          <Col key={book._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
            <BookCard book={book} />
          </Col>
        );
      })}
    </>
  );
}
