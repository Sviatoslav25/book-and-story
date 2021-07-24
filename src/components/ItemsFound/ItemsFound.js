import React, { useEffect, useState } from 'react';
import { Alert, Col } from 'react-bootstrap';
import StoryCard from '../story/StoryCard';
import BookCard from '../book/BookCard';
import useItemsSearch from '../../hooks/useItemsSearch';
import { BOOKS, STORIES } from '../../constants/settings';

export default function ItemsFound({ lineForSearch, setIsSearching, changeRating, isUpdateRating, nameItems }) {
  const [idOfSelectedItem, setIdOfSelectedItem] = useState(null);
  const [foundItems, { loading: isLoading, error, refetch: refetchFoundItems }] = useItemsSearch(
    nameItems,
    lineForSearch
  );

  const onChangeRating = async (itemId, newRating) => {
    setIdOfSelectedItem(itemId);
    if (nameItems === BOOKS) {
      await changeRating(itemId, newRating);
    } else if (nameItems === STORIES) {
      await changeRating(itemId, newRating);
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
                  <BookCard addRating={onChangeRating} book={book} isUpdate={isUpdateRating} />
                ) : (
                  <BookCard addRating={onChangeRating} book={book} />
                )}
              </Col>
            );
          })
        : foundItems?.map((story) => {
            return (
              <Col key={story._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
                {idOfSelectedItem === story._id ? (
                  <StoryCard addRating={onChangeRating} story={story} isUpdate={isUpdateRating} />
                ) : (
                  <StoryCard addRating={onChangeRating} story={story} />
                )}
              </Col>
            );
          })}
    </>
  );
}
