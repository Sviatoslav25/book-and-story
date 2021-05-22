import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import style from '../pagesStyle/StoryDetails.module.scss';

export default function StoryDetails() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [story, setStory] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getStory();
  }, [getStory]);

  function getStory() {
    setIsLoading(true);
    axios
      .get(`/api/stories/${params.id}`)
      .then((resolve) => {
        setStory(resolve.data);
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
