import React, { useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputCreator from '../inputCreator/InputCreator';
import useAPIMethod from '../../hooks/useAPIMethod';
import APIService from '../../services/APIService';
import paths from '../../router/paths';

export default function AddBookForm() {
  const history = useHistory();

  const [bookData, setBookData] = useState({
    name: '',
    img: '',
    date: '',
    genre: '',
    otherAuthors: [],
    pageQuantity: '',
    isPaid: false,
    price: '',
    description: '',
    bookSrc: '',
  });

  const [addBook, isAdding] = useAPIMethod({
    call: APIService.addBook,
    onError: (e) => toast.error(e.message),
    onComplete: () => {
      history.push(paths.home);
    },
  });

  const onChangeName = (e) => {
    setBookData({ ...bookData, name: e.target.value });
  };

  const onChangeImg = (e) => {
    setBookData({ ...bookData, img: e.target.value });
  };

  const onChangeDate = (e) => {
    setBookData({ ...bookData, date: e.target.value });
  };

  const onChangeGenre = (e) => {
    setBookData({ ...bookData, genre: e.target.value });
  };

  const onChangeOtherAuthors = (e) => {
    const otherAuthors = e.target.value.split(',');
    setBookData({ ...bookData, otherAuthors });
  };

  const onChangeQuantity = (e) => {
    setBookData({ ...bookData, pageQuantity: e.target.value });
  };

  const onChangeIsPaid = (e) => {
    setBookData({ ...bookData, isPaid: e.target.checked });
  };

  const onChangePrice = (e) => {
    setBookData({ ...bookData, price: e.target.value });
  };

  const onChangeDescription = (e) => {
    setBookData({ ...bookData, description: e.target.value });
  };

  const onChangeBookSrc = (e) => {
    setBookData({ ...bookData, bookSrc: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    addBook(bookData);
  };

  return (
    <Form onSubmit={submit}>
      <Card.Title>Add book</Card.Title>
      <InputCreator controlId="name" labelText="Book name" value={bookData.name} onChange={onChangeName} />
      <InputCreator controlId="img" labelText="Image (link)" value={bookData.img} onChange={onChangeImg} />
      <InputCreator controlId="date" labelText="Date" value={bookData.date} onChange={onChangeDate} />
      <InputCreator controlId="genre" labelText="Genre" value={bookData.genre} onChange={onChangeGenre} />
      <InputCreator
        controlId="otherAuthors"
        labelText="Other authors"
        value={bookData.otherAuthors}
        onChange={onChangeOtherAuthors}
      />
      <InputCreator
        controlId="pageQuantity"
        labelText="Page quantity"
        value={bookData.pageQuantity}
        onChange={onChangeQuantity}
        type="number"
      />
      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control readOnly={!bookData.isPaid} type="number" value={bookData.price} onChange={onChangePrice} />
        <Form.Check checked={bookData.isPaid} type="checkbox" label="Paid" onChange={onChangeIsPaid} />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={onChangeDescription} />
      </Form.Group>
      <InputCreator controlId="bookSrc" labelText="Book src" value={bookData.bookSrc} onChange={onChangeBookSrc} />
      <Button variant="primary" type="submit" block disabled={isAdding}>
        {isAdding ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            <span className="sr-only">Loading...</span>
          </>
        ) : null}
        Add Book
      </Button>
    </Form>
  );
}
