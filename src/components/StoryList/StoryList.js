import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import paths from '../../router/paths';
import MockDataService from '../../services/MockDataService';
import StoryCard from '../story/StoryCard';
import style from './StoryList.module.scss';

export default function StoryList({ switchToBooks }) {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    fetchStory();
  }, []);

  async function fetchStory() {
    setIsLoading(true);
    try {
      const resolve = await axios.get('/api/stories/all');
      setStories(resolve.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  const addStory = async () => {
    const story = MockDataService.createStory();
    setIsAdding(true);
    try {
      await axios.post('/api/stories/create', story);
      fetchStory();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsAdding(false);
    }
  };

  const ChangeRating = async (storyId, newRating) => {
    try {
      await axios.post('/api/stories/add_rating', { storyId, rating: newRating });
      fetchStory();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Button onClick={switchToBooks}>Books</Button>
        <Button className={style.addButton} onClick={addStory} disabled={isAdding}>
          {isAdding ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </>
          ) : null}
          addStory(Random Data)
        </Button>
        <Link to={paths.addStory}>
          <Button className={style.addButton}>addStory</Button>
        </Link>
      </Container>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      {isLoading && !stories.length ? <>Loading...</> : null}
      {stories.map((story) => {
        return (
          <Col key={story._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
            <StoryCard ChangeRating={ChangeRating} story={story} />
          </Col>
        );
      })}
    </>
  );
}
