import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AddStoryForm from '../components/addStoryFrom/AddStoryForm';

export default function AddBook() {
  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <AddStoryForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
