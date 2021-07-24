import React from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StoryForm from '../components/storyFrom/StoryForm';
import useStoryById from '../hooks/useStoryById';
import useUpdateStory from '../hooks/useUpdateStory';
import paths from '../router/paths';

export default function EditStory() {
  const params = useParams();
  const history = useHistory();
  const [story, { loading: isLoading, error }] = useStoryById(params.id, { fetchPolicy: 'network-only' });

  const [editStory] = useUpdateStory({
    onError: (e) => {
      toast.error(e.message);
    },
    onCompleted: () => {
      toast.success('Story updated successfully');
      history.push(paths.myStories);
    },
  });

  const onSubmit = async (value) => {
    await editStory({ variables: { storyId: params.id, input: value } });
  };

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  if (isLoading && !story) {
    return <Container className="mt-4">loading...</Container>;
  }

  return (
    <>
      <Row className="mt-5">
        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
          <Card>
            <Card.Body>
              <StoryForm onSubmit={onSubmit} textSubmitButton="Edit story" initialValues={story} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
