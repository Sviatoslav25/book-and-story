import React, { useState } from 'react';
import { Alert, Button, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import paths from '../../router/paths';
import MockDataService from '../../services/MockDataService';
import BookCard from '../book/BookCard';
import Search from '../search/Search';
import ItemsFound from '../ItemsFound/ItemsFound';
import ButtonWithSpinner from '../common/ButtonWithSpinner';
import useAddBooks from '../../hooks/useAddBook';
import useBooks from '../../hooks/useBooks';
import useAddRatingForBook from '../../hooks/useAddRatingForBook';
import { BOOKS } from '../../constants/settings';

export default function BookList({ switchToStories }) {
  const [idOfSelectedBook, setIdOfSelectedBook] = useState(null);
  const [isBooksFound, setIsBooksFound] = useState(false);
  const [isSearchingBooks, setIsSearchingBooks] = useState(false);
  const [lineForSearch, setLineForSearch] = useState('');
  const [isResettingSearch, setIsResettingSearch] = useState(false);

  const [books, { loading: isLoading, error, refetch: fetchBook }] = useBooks();

  const [addBook, { loading: isAdding }] = useAddBooks({
    onCompleted: fetchBook,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const [addRating, { loading: isUpdateRating }] = useAddRatingForBook({
    onCompleted: fetchBook,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onAddRating = async (bookId, newRating) => {
    setIdOfSelectedBook(bookId);
    await addRating({ variables: { bookId, rating: newRating } });
    setIdOfSelectedBook(null);
  };

  const searchBooks = async (searchLine) => {
    setLineForSearch(searchLine);
    setIsBooksFound(true);
  };

  const deleteSearch = async () => {
    setIsResettingSearch(true);
    await fetchBook();
    setIsBooksFound(false);
    setLineForSearch('');
    setIsResettingSearch(false);
  };

  return (
    <>
      <Container className="mt-3">
        <Search
          initialValue={lineForSearch}
          isSearching={isSearchingBooks}
          search={searchBooks}
          deleteSearch={deleteSearch}
          isFound={isBooksFound}
          isResettingSearch={isResettingSearch}
        />
        <Button onClick={switchToStories}>Stories</Button>
        <ButtonWithSpinner
          style={{ float: 'right' }}
          onClick={() => {
            addBook({ variables: { input: MockDataService.createBook() } });
          }}
          loading={isAdding}
        >
          Add book(Random Data)
        </ButtonWithSpinner>
        <Link style={{ float: 'right', marginRight: '20px' }} to={paths.addBook}>
          <Button>Add book</Button>
        </Link>
        {error && !isBooksFound ? <Alert variant="danger">{error.message}</Alert> : null}
      </Container>
      {isLoading && !books ? <>Loading...</> : null}
      {isBooksFound ? (
        <ItemsFound
          changeRating={onAddRating}
          isUpdateRating={isUpdateRating}
          lineForSearch={lineForSearch}
          setIsSearching={setIsSearchingBooks}
          nameItems={BOOKS}
        />
      ) : (
        books?.map((book) => {
          return (
            <Col key={book._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
              {idOfSelectedBook === book._id ? (
                <BookCard addRating={onAddRating} book={book} isUpdate={isUpdateRating} />
              ) : (
                <BookCard addRating={onAddRating} book={book} />
              )}
            </Col>
          );
        })
      )}
    </>
  );
}
