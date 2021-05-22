import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import style from '../pagesStyle/BookDetails.module.scss';

export default function BookDetails() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    getBook();
  }, [getBook]);

  function getBook() {
    setIsLoading(true);
    axios
      .get(`/api/books/${params.id}`)
      .then((resolve) => {
        setBook(resolve.data);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }
  return (
    <Container className="mt-4">
      {isLoading || !book ? (
        'loading...'
      ) : (
        <Card>
          <Card.Img className={style.bookImage} alt={`${book.name} image`} variant="top" src={book.img} />
          <Card.Body>
            <Card.Title>{book.name}</Card.Title>
            <Card.Text>Description:{book.description}</Card.Text>
            <Card.Text>
              Authors:
              {book.otherAuthors.map((item) => {
                return item;
              })}
            </Card.Text>
            <a href={book.bookSrc}>Book</a>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
