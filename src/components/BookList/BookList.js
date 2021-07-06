import React, { useState } from 'react';
import { Alert, Button, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import paths from '../../router/paths';
import MockDataService from '../../services/MockDataService';
import BookCard from '../book/BookCard';
import Search from '../search/Search';
import style from './BookList.module.scss';
import useAPIMethod from '../../hooks/useAPIMethod';
import useAPIQuery from '../../hooks/useAPIQuery';
import ItemsFound, { BOOKS } from '../ItemsFound/ItemsFound';
import APIService from '../../services/APIService';
import ButtonWithSpinner from '../common/ButtonWithSpinner';

export default function BookList({ switchToStories }) {
  const [idOfSelectedBook, setIdOfSelectedBook] = useState(null);
  const [isBooksFound, setIsBooksFound] = useState(false);
  const [isSearchingBooks, setIsSearchingBooks] = useState(false);
  const [lineForSearch, setLineForSearch] = useState('');
  const [isResettingSearch, setIsResettingSearch] = useState(false);

  const [books, fetchBook, isLoading, error] = useAPIQuery({ call: APIService.getBookList });

  const [addBook, isAdding] = useAPIMethod({
    call: APIService.addBook,
    onComplete: fetchBook,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const [changeRating, isUpdateRating] = useAPIMethod({
    call: APIService.changeRantingForBook,
    onComplete: fetchBook,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onChangeRating = async (bookId, newRating) => {
    setIdOfSelectedBook(bookId);
    await changeRating({ bookId, rating: newRating });
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
          className={style.addButton}
          onClick={() => {
            addBook(MockDataService.createBook());
          }}
          loading={isAdding}
        >
          addBook(Random Data)
        </ButtonWithSpinner>
        <Link to={paths.addBook}>
          <Button className={style.addButton}>addBook</Button>
        </Link>
        {error && !isBooksFound ? <Alert variant="danger">{error.message}</Alert> : null}
      </Container>
      {isLoading && !books ? <>Loading...</> : null}
      {isBooksFound ? (
        <ItemsFound lineForSearch={lineForSearch} setIsSearching={setIsSearchingBooks} nameItems={BOOKS} />
      ) : (
        books?.map((book) => {
          return (
            <Col key={book._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
              {idOfSelectedBook === book._id ? (
                <BookCard ChangeRating={onChangeRating} book={book} isUpdate={isUpdateRating} />
              ) : (
                <BookCard ChangeRating={onChangeRating} book={book} />
              )}
            </Col>
          );
        })
      )}
    </>
  );
}
