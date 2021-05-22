import React, { useState } from 'react';
import { Row } from 'react-bootstrap';

import BookList from '../components/BookList/BookList';
import StoryList from '../components/StoryList/StoryList';
import ShowBooksOrStoriesManager from '../services/ShowBooksOrStoriesManager';

export default function Home() {
  const [isBook, setIsBook] = useState(ShowBooksOrStoriesManager.isShowBooks());

  const switchToBooks = () => {
    ShowBooksOrStoriesManager.setIsBooks(true);
    setIsBook(true);
  };

  const switchToStories = () => {
    ShowBooksOrStoriesManager.setIsBooks(false);
    setIsBook(false);
  };

  return (
    <>
      <Row>{isBook ? <BookList switchToStories={switchToStories} /> : <StoryList switchToBooks={switchToBooks} />}</Row>
    </>
  );
}
