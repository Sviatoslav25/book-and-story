import React from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookForm from '../components/bookForm/BookForm';
import useBookById from '../hooks/useBookById';
import useUpdateBook from '../hooks/useUpdateBook';
import paths from '../router/paths';

export default function EditBook() {
  const params = useParams();
  const history = useHistory();
  const [book, { loading: isLoading, error }] = useBookById(params.id, { fetchPolicy: 'network-only' });
  const [editBook] = useUpdateBook({
    onCompleted: () => {
      toast.success('book updated successfully');
      history.push(paths.myBooks);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit = (values) => {
    let input = values;
    if (!values.isPaid) {
      input = { ...input, price: 0 };
    }
    editBook({ variables: { bookId: params.id, input } });
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
            <BookForm textSubmitButton="Edit book" onSubmit={onSubmit} initialValues={book} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
