import React from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddBookForm from '../components/addBookForm/AddBookForm';
import useAPIMethod from '../hooks/useAPIMethod';
import useAPIQuery from '../hooks/useAPIQuery';
import paths from '../router/paths';
import APIService from '../services/APIService';

export default function EditBook() {
  const params = useParams();
  const history = useHistory();
  const [book, , isLoading, error] = useAPIQuery({ call: APIService.getBook(params.id) });

  const [editBook] = useAPIMethod({
    call: APIService.updateBook(params.id),
    onComplete: () => {
      toast.success('book updated successfully');
      history.push(paths.myBooks);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit = (values) => {
    editBook(values);
  };

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  if (isLoading && !book) {
    return <Container className="mt-4">loading...</Container>;
  }

  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <AddBookForm textSubmitButton="Edit book" onSubmit={onSubmit} initialValues={book} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
