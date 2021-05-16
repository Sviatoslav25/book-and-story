import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BookCard from '../components/book/BookCard';
import StoryCard from '../components/story/StoryCard';
import MockDataService from '../services/MockDataService';
import homeStyle from '../pagesStyle/Home.module.scss';
import paths from '../router/paths';

export default function Home() {
  const [isBook, setIsBook] = useState(true);
  const [books, setBooks] = useState(MockDataService.getBooks());
  const [stories, setStories] = useState(MockDataService.getStories());

  const changeView = () => {
    setIsBook(!isBook);
  };

  const addBookRandomData = () => {
    const book = MockDataService.createBook();
    setBooks([book, ...books]);
  };

  const addStoryRandomData = () => {
    const story = MockDataService.createStory();
    setStories([story, ...stories]);
  };

  return (
    <>
      <Button onClick={changeView} className="mt-4">
        {isBook ? 'Stories' : 'Books'}
      </Button>
      {isBook ? (
        <Button className={homeStyle.addButton} onClick={addBookRandomData}>
          addBook(Random Data)
        </Button>
      ) : (
        <Button className={homeStyle.addButton} onClick={addStoryRandomData}>
          addStory(Random Data)
        </Button>
      )}
      {isBook ? (
        <Link to={paths.addBook}>
          <Button className={homeStyle.addButton}>addBook</Button>
        </Link>
      ) : (
        <Link to={paths.addStory}>
          <Button className={homeStyle.addButton}>addStory</Button>
        </Link>
      )}
      <Row>
        {isBook
          ? books.map((book) => {
              return (
                <Col key={book._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
                  <BookCard book={book} />
                </Col>
              );
            })
          : stories.map((story) => {
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
