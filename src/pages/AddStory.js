import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddStoryForm from '../components/addStoryFrom/AddStoryForm';
import useAPIMethod from '../hooks/useAPIMethod';
import paths from '../router/paths';
import APIService from '../services/APIService';

export default function AddBook() {
  const history = useHistory();

  const [addStory] = useAPIMethod({
    call: APIService.addStory,
    onError: (e) => {
      toast.error(e.message);
    },
    onComplete: () => {
      toast.success('Story created successfully');
      history.push(paths.home);
    },
  });

  const onSubmit = (values) => {
    addStory(values);
  };
  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <AddStoryForm onSubmit={onSubmit} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
