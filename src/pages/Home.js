import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import BookCard from '../components/book/BookCard';
import StoryCard from '../components/story/StoryCard';
import MockDataService from '../services/MockDataService';

export default function Home() {
  const [isBook, setIsBook] = useState(true);

  const bookList = MockDataService.getBooks();
  const storyList = MockDataService.getStory();

  const changeView = () => {
    setIsBook(!isBook);
  };

  return (
    <>
      <Button onClick={changeView} className="mt-4">
        {isBook ? 'Stories' : 'Books'}
      </Button>
      <Row>
        {isBook
          ? bookList.map((book) => {
              return (
                <Col key={book._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
                  <BookCard book={book} />
                </Col>
              );
            })
          : storyList.map((story) => {
              return (
                <Col key={story._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
                  <StoryCard story={story} />
                </Col>
              );
            })}
      </Row>
    </>
  );
}
