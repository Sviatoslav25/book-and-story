import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import MockDataService from '../../services/MockDataService';
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

  const submit = (e) => {
    e.preventDefault();
    MockDataService.createStoryFromForm(storyData);
    history.push('/home');
  };

  return (
    <Form onSubmit={submit}>
      <Card.Title>Add story</Card.Title>
      <InputCreator controlId="name" labelText="Book name" value={storyData.name} onChange={onChangeName} />
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
        Add Story
      </Button>
    </Form>
  );
}
