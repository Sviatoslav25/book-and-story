import React from 'react';
import { Col, Row } from 'react-bootstrap';
import BookCard from '../components/book/BookCard';
import MockDataService from '../services/MockDataService';

export default function Home() {
  const bookList = MockDataService.getBooks();
  return (
    <>
      <Row>
        {bookList.map((book) => {
          return (
            <Col key={book._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
              <BookCard book={book} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
