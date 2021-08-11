import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import ShowBooksOrStoriesManager from '../services/ShowBooksOrStoriesManager';
import FavoritesBooks from '../components/favorites/FavoritesBooks';
import FavoritesStories from '../components/favorites/FavoritesStories';

export default function Favorites() {
  const [isBook, setIsBook] = useState(ShowBooksOrStoriesManager.isShowFavoritesBooks());

  const switchToFavoritesBooks = () => {
    ShowBooksOrStoriesManager.setIsFavoritesBooks(true);
    setIsBook(true);
  };

  const switchToFavoritesStories = () => {
    ShowBooksOrStoriesManager.setIsFavoritesBooks(false);
    setIsBook(false);
  };

  return (
    <>
      <Row>
        {isBook ? (
          <FavoritesBooks switchToFavoritesStories={switchToFavoritesStories} />
        ) : (
          <FavoritesStories switchToFavoritesBooks={switchToFavoritesBooks} />
        )}
      </Row>
    </>
  );
}
