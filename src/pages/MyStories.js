import React from 'react';
import { Alert, Col, Container, Row, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MyItemCard from '../components/MyItemCard/MyItemCard';
import { STORIES } from '../constants/settings';
import useAPIMethod from '../hooks/useAPIMethod';
import useAPIQuery from '../hooks/useAPIQuery';
import paths from '../router/paths';
import APIService from '../services/APIService';
import MockDataService from '../services/MockDataService';

export default function MyStories() {
  const [stories, refetchStories, isLoading, error] = useAPIQuery({ call: APIService.getCurrentUserStories });
  const [addStory, isAdding] = useAPIMethod({
    call: APIService.addStory,
    onComplete: refetchStories,
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return (
    <Container className="mt-3">
      <Button
        onClick={() => {
          addStory(MockDataService.createStory());
        }}
        disabled={isAdding}
      >
        {isAdding ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            <span className="sr-only">Loading...</span>
          </>
        ) : null}
        add story(Random Data)
      </Button>
      <Link to={paths.addStory}>
        <Button>add story</Button>
      </Link>
      {error && <Alert variant="danger">{error.message}</Alert>}
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <Row>
          {stories?.map((story) => (
            <Col key={story._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
              <MyItemCard item={story} refetchItems={refetchStories} nameItem={STORIES} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}