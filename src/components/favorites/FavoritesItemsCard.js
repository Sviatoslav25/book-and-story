import { Card } from 'react-bootstrap';
import { generatePath, Link } from 'react-router-dom';
import { BOOKS, STORY_PICTURE } from '../../constants/settings';
import paths from '../../router/paths';

export default function FavoriteItemCard({ nameItem, item }) {
  return (
    <Card>
      <Link
        to={generatePath(nameItem === BOOKS ? paths.book : paths.story, { id: item._id })}
        style={{ color: 'inherit', textDecoration: 'inherit' }}
      >
        <Card.Img alt={`${item.name} image`} variant="top" src={nameItem === BOOKS ? item.img : STORY_PICTURE} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{nameItem === BOOKS ? item.description : item.shortDescription}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}
