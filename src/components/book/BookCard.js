import { Card } from 'react-bootstrap';
import { generatePath, Link } from 'react-router-dom';
import paths from '../../router/paths';
import style from './BookCard.module.scss';

export default function BookCard({ book }) {
  return (
    <Link to={generatePath(paths.book, { id: book._id })} className={style.lintStyle}>
      <Card>
        <Card.Img alt={`${book.name} image`} variant="top" src={book.img} />
        <Card.Body>
          <Card.Title>{book.name}</Card.Title>
          <Card.Text>{book.description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
