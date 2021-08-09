/* eslint-disable no-nested-ternary */
import { faBookmark, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Alert, Row, Col, Image, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RatingStart from '../components/RatingStar/RatingStart';
import { BOOKS } from '../constants/settings';
import useBookById from '../hooks/useBookById';
import useAddItemToFavorites from '../hooks/useAddItemToFavorites';
import useRemoveItemFromFavorites from '../hooks/useRemoveItemFromFavorites';

export default function BookDetails() {
  const params = useParams();

  const [book, { loading: isLoading, error, refetch: refetchBook }] = useBookById(params.id);

  const [addBookToFavorites, { loading: IsAddingBookToFavorites }] = useAddItemToFavorites(BOOKS, {
    onCompleted: () => {
      toast.success('Book added to favorites successfully');
      refetchBook();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const [removeBookFromFavorites, { loading: isRemovingBookFromFavorites }] = useRemoveItemFromFavorites(BOOKS, {
    onCompleted: () => {
      toast.success('Book removed from favorites successfully');
      refetchBook();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onAddBookToFavorites = () => {
    addBookToFavorites({ variables: { bookId: params.id } });
  };

  const onRemoveBookFromFavorites = () => {
    removeBookFromFavorites({ variables: { bookId: params.id } });
  };

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }
  return (
    <Container className="mt-4">
      {isLoading || !book ? (
        'loading...'
      ) : (
        <>
          <Row>
            <Col lg="3" md="4" sm="4" xs="5">
              <Image src={book.img} alt={book.name} rounded style={{ width: '250px', objectFit: 'cover' }} />
            </Col>
            <Col>
              <Card border="light">
                <Card.Body>
                  <Card.Title
                    style={{ fontSize: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
                  >
                    {book.name}
                    {IsAddingBookToFavorites || isRemovingBookFromFavorites ? (
                      <Spinner
                        animation="border"
                        variant="primary"
                        style={{ marginLeft: 'auto', marginRight: '5px' }}
                      />
                    ) : book.isFavorite ? (
                      <FontAwesomeIcon
                        onClick={onRemoveBookFromFavorites}
                        style={{ marginLeft: 'auto', marginRight: '5px', cursor: 'pointer' }}
                        title="Remove from favorites"
                        icon={faTimes}
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={onAddBookToFavorites}
                        style={{ marginLeft: 'auto', marginRight: '5px', cursor: 'pointer' }}
                        title="Add to favorites"
                        icon={faBookmark}
                      />
                    )}
                  </Card.Title>
                  <Card.Link href={book.bookURL}>Read</Card.Link>
                  <Card.Title>genre: {book.genre}</Card.Title>
                  {book.isPaid && <Card.Title>Price: {book.price}</Card.Title>}
                  <Card.Title>Number of pages: {book.pagesQuantity}</Card.Title>
                  <RatingStart rating={book.rating} />
                  <Card.Text style={{ textAlign: 'right' }}>Author: {book.author.email}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title>Description</Card.Title>
              <Card.Text>{book.description}</Card.Text>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}
