import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AddBookForm from '../components/addBookForm/AddBookForm';

export default function AddBook() {
  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <AddBookForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
