import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddBookForm from '../components/addBookForm/AddBookForm';
import useAPIMethod from '../hooks/useAPIMethod';
import paths from '../router/paths';
import APIService from '../services/APIService';

export default function AddBook() {
  const history = useHistory();

  const [addBook] = useAPIMethod({
    call: APIService.addBook,
    onError: (e) => toast.error(e.message),
    onComplete: () => {
      toast.success('Book created successfully');
      history.push(paths.home);
    },
  });

  const onSubmit = async (value) => {
    if (value.isPaid) {
      await addBook(value);
    } else {
      await addBook({ ...value, price: '' });
    }
  };
  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <AddBookForm onSubmit={onSubmit} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
