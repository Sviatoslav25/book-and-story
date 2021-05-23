import { Card } from 'react-bootstrap';
import { generatePath, Link } from 'react-router-dom';
import paths from '../../router/paths';
import ChangeRatingStart from '../RatingStar/ChangeRantingStart';
import RatingStart from '../RatingStar/RatingStart';
import style from './BookCard.module.scss';

export default function BookCard({ book, ChangeRating }) {
  const addBookIdForChangeRating = (newRating) => {
    ChangeRating(book._id, newRating);
  };

  return (
    <Card>
      <Link to={generatePath(paths.book, { id: book._id })} className={style.lintStyle}>
        <Card.Img alt={`${book.name} image`} variant="top" src={book.img} />
        <Card.Body>
          <Card.Title>{book.name}</Card.Title>
          <Card.Text>{book.description}</Card.Text>
        </Card.Body>
      </Link>
      <ChangeRatingStart ChangeRating={addBookIdForChangeRating} />
      <RatingStart rating={book.rating} />
    </Card>
  );
}
