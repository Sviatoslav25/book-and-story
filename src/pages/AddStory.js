import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import StoryForm from '../components/storyFrom/StoryForm';
import useAddStory from '../hooks/useAddStory';
import paths from '../router/paths';

export default function AddStory() {
  const history = useHistory();
  const [addStory] = useAddStory({
    onError: (e) => {
      toast.error(e.message);
    },
    onCompleted: () => {
      toast.success('Story created successfully');
      history.push(paths.home);
    },
  });

  const onSubmit = async (values) => {
    await addStory({ variables: { input: values } });
  };
  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <StoryForm onSubmit={onSubmit} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
