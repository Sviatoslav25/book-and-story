import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputCreator from '../inputCreator/InputCreator';

export default function AddStoryForm() {
  const history = useHistory();

  const [storyData, setStoryData] = useState({
    name: '',
    date: '',
    genre: '',
    shortDescription: '',
    story: '',
  });
  const [isAdding, setIsAdding] = useState(false);

  const onChangeName = (e) => {
    setStoryData({ ...storyData, name: e.target.value });
  };

  const onChangeDate = (e) => {
    setStoryData({ ...storyData, date: e.target.value });
  };

  const onChangeGenre = (e) => {
    setStoryData({ ...storyData, genre: e.target.value });
  };

  const onChangeShortDescription = (e) => {
    setStoryData({ ...storyData, shortDescription: e.target.value });
  };

  const onChangeStory = (e) => {
    setStoryData({ ...storyData, story: e.target.value });
  };

  const addStory = () => {
    setIsAdding(true);
    axios
      .post('/api/stories/create', storyData)
      .then(() => {
        history.push('/home');
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => {
        setIsAdding(false);
      });
  };

  const submit = (e) => {
    e.preventDefault();
    addStory();
  };

  return (
    <Form onSubmit={submit}>
      <Card.Title>Add story</Card.Title>
      <InputCreator controlId="name" labelText="Story name" value={storyData.name} onChange={onChangeName} />
      <InputCreator controlId="date" labelText="Date" value={storyData.date} onChange={onChangeDate} />
      <InputCreator controlId="genre" labelText="Genre" value={storyData.genre} onChange={onChangeGenre} />
      <Form.Group controlId="shortDescription">
        <Form.Label>Short description</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={onChangeShortDescription} />
      </Form.Group>
      <Form.Group controlId="story">
        <Form.Label>Story</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={onChangeStory} />
      </Form.Group>
      <Button variant="primary" type="submit" block>
        {isAdding ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            <span className="sr-only">Loading...</span>
          </>
        ) : null}
        Add Story
      </Button>
    </Form>
  );
}
