import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import BookCard from '../components/book/BookCard';
import StoryCard from '../components/story/StoryCard';
import MockDataService from '../services/MockDataService';
import homeStyle from '../pagesStyle/Home.module.scss';

export default function Home() {
  const [isBook, setIsBook] = useState(true);
  const [books, setBooks] = useState([]);
  const [stories, setStories] = useState([]);

  // const bookList = MockDataService.getBooks();
  // const storyList = MockDataService.getStories();

  const changeView = () => {
    setIsBook(!isBook);
  };

  const addBook = () => {
    const book = MockDataService.createBook();
    setBooks([book, ...books]);
  };

  const addStory = () => {
    const story = MockDataService.createStory();
    setStories([story, ...stories]);
  };

  return (
    <>
      <Button onClick={changeView} className="mt-4">
        {isBook ? 'Stories' : 'Books'}
      </Button>
      {isBook ? (
        <Button className={homeStyle.addButton} onClick={addBook}>
          addBook
        </Button>
      ) : (
        <Button className={homeStyle.addButton} onClick={addStory}>
          addStory
        </Button>
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
