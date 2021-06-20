import React, { useEffect, useState } from 'react';
import { Alert, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useAPIMethod from '../../hooks/useAPIMethod';
import useAPIQuery from '../../hooks/useAPIQuery';
import BookCard from '../book/BookCard';

export default function BooksFound({ lineForSearch, setIsSearchingBooks }) {
  const [idOfSelectedBook, setIdOfSelectedBook] = useState(null);
  const [foundBooks, refetchFoundBooks, isLoading, error] = useAPIQuery({ url: `/api/books/search/${lineForSearch}` });
  const [changeRating, isUpdateRating] = useAPIMethod({
    onComplete: refetchFoundBooks,
    url: '/api/books/add_rating',
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onChangeRating = async (bookId, newRating) => {
    setIdOfSelectedBook(bookId);
    await changeRating({ bookId, rating: newRating });
    setIdOfSelectedBook(null);
  };

  useEffect(() => {
    setIsSearchingBooks(isLoading);
  }, [isLoading, setIsSearchingBooks]);

  return (
    <>
      {error ? <Alert variant="danger">{error.message}</Alert> : null}
      {foundBooks?.map((book) => {
        return (
          <Col key={book._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
            {idOfSelectedBook === book._id ? (
              <BookCard ChangeRating={onChangeRating} book={book} isUpdate={isUpdateRating} />
            ) : (
              <BookCard ChangeRating={onChangeRating} book={book} />
            )}
          </Col>
        );
      })}
    </>
  );
}
