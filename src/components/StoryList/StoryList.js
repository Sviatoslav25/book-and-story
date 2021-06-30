import React, { useState } from 'react';
import { Alert, Button, Col, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAPIMethod from '../../hooks/useAPIMethod';
import useAPIQuery from '../../hooks/useAPIQuery';
import paths from '../../router/paths';
import Search from '../search/Search';
import StoryCard from '../story/StoryCard';
import style from './StoryList.module.scss';
import ItemsFound, { STORIES } from '../ItemsFound/ItemsFound';
import MockDataService from '../../services/MockDataService';
import APIService from '../../services/APIService';

export default function StoryList({ switchToBooks }) {
  const [idOfSelectedStory, setIdOfSelectedStory] = useState(null);
  const [lineForSearch, setLineForSearch] = useState('');
  const [isSearchingStories, setIsSearchingStories] = useState(false);
  const [isStoriesFound, setIsStoriesFound] = useState(false);
  const [isResettingSearch, setIsResettingSearch] = useState(false);

  const [stories, fetchStory, isLoading, error] = useAPIQuery({ call: APIService.getStoryList });

  const [addStory, isAdding] = useAPIMethod({
    onComplete: fetchStory,
    call: APIService.addStory,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const [changeRating, isUpdateRating] = useAPIMethod({
    onComplete: fetchStory,
    call: APIService.changeRantingForStories,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onChangeRating = async (storyId, newRating) => {
    setIdOfSelectedStory(storyId);
    await changeRating({ storyId, rating: newRating });
    setIdOfSelectedStory(null);
  };

  const searchStories = (searchLine) => {
    setLineForSearch(searchLine);
    setIsStoriesFound(true);
  };

  const deleteSearch = async () => {
    setIsResettingSearch(true);
    await fetchStory();
    setIsStoriesFound(false);
    setLineForSearch('');
    setIsResettingSearch(false);
  };

  return (
    <>
      <Container className="mt-3">
        <Search
          isResettingSearch={isResettingSearch}
          isSearching={isSearchingStories}
          search={searchStories}
          deleteSearch={deleteSearch}
          isFound={isStoriesFound}
        />
        <Button onClick={switchToBooks}>Books</Button>
        <Button
          className={style.addButton}
          onClick={() => {
            addStory(MockDataService.createStory());
          }}
          disabled={isAdding}
        >
          {isAdding ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </>
          ) : null}
          addStory(Random Data)
        </Button>
        <Link to={paths.addStory}>
          <Button className={style.addButton}>addStory</Button>
        </Link>
      </Container>
      {error ? <Alert variant="danger">{error.message}</Alert> : null}
      {isLoading && !stories ? <>Loading...</> : null}
      {isStoriesFound ? (
        <ItemsFound lineForSearch={lineForSearch} setIsSearching={setIsSearchingStories} nameItems={STORIES} />
      ) : (
        stories?.map((story) => {
          return (
            <Col key={story._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
              {idOfSelectedStory === story._id ? (
                <StoryCard isUpdate={isUpdateRating} ChangeRating={onChangeRating} story={story} />
              ) : (
                <StoryCard ChangeRating={onChangeRating} story={story} />
              )}
            </Col>
          );
        })
      )}
    </>
  );
}
