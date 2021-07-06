import React, { useEffect, useState } from 'react';
import { Alert, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useAPIMethod from '../../hooks/useAPIMethod';
import useAPIQuery from '../../hooks/useAPIQuery';
import StoryCard from '../story/StoryCard';
import BookCard from '../book/BookCard';
import APIService from '../../services/APIService';

export const BOOKS = 'BOOKS';
export const STORIES = 'STORIES';

export default function ItemsFound({ lineForSearch, setIsSearching, nameItems }) {
  const [idOfSelectedItem, setIdOfSelectedItem] = useState(null);
  const [foundItems, refetchFoundItems, isLoading, error] = useAPIQuery({
    call: nameItems === BOOKS ? APIService.searchBooks(lineForSearch) : APIService.searchStories(lineForSearch),
  });
  const [changeRating, isUpdateRating] = useAPIMethod({
    call: nameItems === BOOKS ? APIService.changeRantingForBook : APIService.changeRantingForStories,
    onComplete: refetchFoundItems,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onChangeRating = async (itemId, newRating) => {
    setIdOfSelectedItem(itemId);
    if (nameItems === BOOKS) {
      await changeRating({ bookId: itemId, rating: newRating });
    } else if (nameItems === STORIES) {
      await changeRating({ storyId: itemId, rating: newRating });
    }
    setIdOfSelectedItem(null);
  };

  useEffect(() => {
    refetchFoundItems();
  }, [lineForSearch, refetchFoundItems]);

  useEffect(() => {
    setIsSearching(isLoading);
  }, [isLoading, setIsSearching]);

  return (
    <>
      {error ? <Alert variant="danger">{error.message}</Alert> : null}
      {nameItems === BOOKS
        ? foundItems?.map((book) => {
            return (
              <Col key={book._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
                {idOfSelectedItem === book._id ? (
                  <BookCard ChangeRating={onChangeRating} book={book} isUpdate={isUpdateRating} />
                ) : (
                  <BookCard ChangeRating={onChangeRating} book={book} />
                )}
              </Col>
            );
          })
        : foundItems?.map((story) => {
            return (
              <Col key={story._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
                {idOfSelectedItem === story._id ? (
                  <StoryCard ChangeRating={onChangeRating} story={story} isUpdate={isUpdateRating} />
                ) : (
                  <StoryCard ChangeRating={onChangeRating} story={story} />
                )}
              </Col>
            );
          })}
    </>
  );
}
