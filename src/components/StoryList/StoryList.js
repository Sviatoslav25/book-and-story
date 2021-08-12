import React, { useState } from 'react';
import { Alert, Button, Col, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import paths from '../../router/paths';
import Search from '../search/Search';
import StoryCard from '../story/StoryCard';
import ItemsFound from '../ItemsFound/ItemsFound';
import MockDataService from '../../services/MockDataService';
import useStories from '../../hooks/useStories';
import useAddStory from '../../hooks/useAddStory';
import useAddRatingForStory from '../../hooks/useAddRatingForStory';
import { STORIES } from '../../constants/settings';

export default function StoryList({ switchToBooks }) {
  const [idOfSelectedStory, setIdOfSelectedStory] = useState(null);
  const [lineForSearch, setLineForSearch] = useState('');
  const [isSearchingStories, setIsSearchingStories] = useState(false);
  const [isStoriesFound, setIsStoriesFound] = useState(false);
  const [isResettingSearch, setIsResettingSearch] = useState(false);

  const [stories, { refetch: fetchStory, isLoading, error }] = useStories();
  const [addStory, { loading: isAdding }] = useAddStory({
    onCompleted: fetchStory,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const [addRating, { loading: isUpdateRating }] = useAddRatingForStory({
    onCompleted: fetchStory,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onAddRating = async (storyId, newRating) => {
    setIdOfSelectedStory(storyId);
    await addRating({ variables: { storyId, rating: newRating } });
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
          style={{ float: 'right' }}
          onClick={() => {
            addStory({ variables: { input: MockDataService.createStory() } });
          }}
          disabled={isAdding}
        >
          {isAdding ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </>
          ) : null}
          Add story(Random Data)
        </Button>
        <Link style={{ float: 'right', marginRight: '20px' }} to={paths.addStory}>
          <Button>Add story</Button>
        </Link>
      </Container>
      {error ? <Alert variant="danger">{error.message}</Alert> : null}
      {isLoading && !stories ? <>Loading...</> : null}
      {isStoriesFound ? (
        <ItemsFound
          changeRating={onAddRating}
          lineForSearch={lineForSearch}
          setIsSearching={setIsSearchingStories}
          nameItems={STORIES}
          isUpdateRating={isUpdateRating}
        />
      ) : (
        stories?.map((story) => {
          return (
            <Col key={story._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
              {idOfSelectedStory === story._id ? (
                <StoryCard isUpdate={isUpdateRating} addRating={onAddRating} story={story} />
              ) : (
                <StoryCard addRating={onAddRating} story={story} />
              )}
            </Col>
          );
        })
      )}
    </>
  );
}
