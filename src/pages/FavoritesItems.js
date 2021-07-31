import React, { useState } from 'react';
import { Row } from 'react-bootstrap';

import BookList from '../components/BookList/BookList';
import StoryList from '../components/StoryList/StoryList';
import ShowBooksOrStoriesManager from '../services/ShowBooksOrStoriesManager';

export default function Home() {
  const [isFavoritesBooks, setIsFavoritesBooks] = useState(ShowBooksOrStoriesManager.isShowFavoritesBooks());

  const switchToBooks = () => {
    ShowBooksOrStoriesManager.setIsFavoritesBooks(true);
    setIsFavoritesBooks(true);
  };

  const switchToStories = () => {
    ShowBooksOrStoriesManager.setIsFavoritesBooks(false);
    setIsFavoritesBooks(false);
  };

  return (
    <>
      <Row>
        {isFavoritesBooks ? (
          <BookList switchToStories={switchToStories} />
        ) : (
          <StoryList switchToBooks={switchToBooks} />
        )}
      </Row>
    </>
  );
}
