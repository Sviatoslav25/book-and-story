import { Alert, Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useAPIQuery from '../hooks/useAPIQuery';
import style from '../pagesStyle/StoryDetails.module.scss';
import APIService from '../services/APIService';

export default function StoryDetails() {
  const params = useParams();
  const [story, , isLoading, error] = useAPIQuery({ call: APIService.getStory(params.id) });

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  const storyImg =
    'https://images-platform.99static.com//4sAE0-g_qA0-XAYWunH9YKSpsQ8=/160x139:837x816/fit-in/500x500/99designs-contests-attachments/110/110993/attachment_110993584';
  return (
    <Container className="mt-4">
      {isLoading || !story ? (
        'loading...'
      ) : (
        <Card>
          <Card.Img className={style.storyImage} alt={`${story.name} image`} variant="top" src={storyImg} />
          <Card.Body>
            <Card.Title>Story name: {story.name}</Card.Title>
            <Card.Text>Story: {story.story}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
