import { Card } from 'react-bootstrap';
import { generatePath, Link } from 'react-router-dom';
import paths from '../../router/paths';
import ChangeRatingStart from '../RatingStar/ChangeRantingStart';
import RatingStart from '../RatingStar/RatingStart';
import style from './StoryCard.module.scss';

const storyImg =
  'https://images-platform.99static.com//4sAE0-g_qA0-XAYWunH9YKSpsQ8=/160x139:837x816/fit-in/500x500/99designs-contests-attachments/110/110993/attachment_110993584';

export default function StoryCard({ story, ChangeRating }) {
  const addBookIdForChangeRating = (newRating) => {
    ChangeRating(story._id, newRating);
  };

  return (
    <Card>
      <Link to={generatePath(paths.story, { id: story._id })} className={style.lintStyle}>
        <Card.Img alt={`${story.name} image`} variant="top" src={storyImg} />
        <Card.Body>
          <Card.Title>{story.name}</Card.Title>
          <Card.Text>{story.shortDescription}</Card.Text>
        </Card.Body>
      </Link>
      <ChangeRatingStart ChangeRating={addBookIdForChangeRating} />
      <RatingStart rating={story.rating} />
    </Card>
  );
}
