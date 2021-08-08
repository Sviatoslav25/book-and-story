/* eslint-disable no-nested-ternary */
import { faBookmark, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RatingStart from '../components/RatingStar/RatingStart';
import { STORIES } from '../constants/settings';
import useAddItemToFavorites from '../hooks/useAddItemToFavorites';
import useRemoveItemFromFavorites from '../hooks/useRemoveItemFromFavorites';
import useStoryById from '../hooks/useStoryById';

export default function StoryDetails() {
  const params = useParams();
  const [story, { loading: isLoading, error, refetch: refetchStory }] = useStoryById(params.id);

  const [addStoryToFavorites, { loading: isAddingToFavorites }] = useAddItemToFavorites(STORIES, {
    onCompleted: () => {
      toast.success('Story added to favorites successfully');
      refetchStory();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const [removeStoryFromFavorites, { loading: isRemovingStoryFromFavorites }] = useRemoveItemFromFavorites(STORIES, {
    onCompleted: () => {
      toast.success('Story removed from favorites successfully');
      refetchStory();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onAddToFavorites = () => {
    addStoryToFavorites({ variables: { storyId: params.id } });
  };
  const onRemoveStoryFromFavorites = () => {
    removeStoryFromFavorites({ variables: { storyId: params.id } });
  };

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
        <Row>
          <Col lg="3" md="4" sm="4" xs="5">
            <Image
              src={storyImg}
              alt={story.name}
              rounded
              style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
            />
          </Col>
          <Col lg="9" md="8" sm="8" xs="7">
            <Card border="light">
              <Card.Body>
                <Card.Title
                  style={{ fontSize: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
                >
                  {story.name}
                  {isAddingToFavorites || isRemovingStoryFromFavorites ? (
                    <Spinner animation="border" variant="primary" style={{ marginLeft: 'auto', marginRight: '5px' }} />
                  ) : story.isFavorite ? (
                    <FontAwesomeIcon
                      onClick={onRemoveStoryFromFavorites}
                      style={{ marginLeft: 'auto', marginRight: '5px', cursor: 'pointer' }}
                      title="Remove from favorites"
                      icon={faTimes}
                    />
                  ) : (
                    <FontAwesomeIcon
                      onClick={onAddToFavorites}
                      style={{ marginLeft: 'auto', marginRight: '5px', cursor: 'pointer' }}
                      title="Add to favorites"
                      icon={faBookmark}
                    />
                  )}
                </Card.Title>
                <Card.Title>genre: {story.genre}</Card.Title>
                <RatingStart rating={story.rating} />
                <Card.Text style={{ textAlign: 'right' }}>Author: {story.author.email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-5">
              <Card.Body>
                <Card.Title>Description</Card.Title>
                <Card.Text>{story.shortDescription}</Card.Text>
              </Card.Body>
              <Card.Body className="mt-5">
                <Card.Title>Story</Card.Title>
                <Card.Text>{story.story}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
