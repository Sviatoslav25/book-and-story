import React, { useEffect, useState } from 'react';
import { Alert, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useAPIMethod from '../../hooks/useAPIMethod';
import useAPIQuery from '../../hooks/useAPIQuery';
import StoryCard from '../story/StoryCard';

export default function StoriesFound({ lineForSearch, setIsSearchingStories }) {
  const [idOfSelectedStory, setIdOfSelectedStory] = useState(null);
  const [foundStories, refetchFoundStories, isLoading, error] = useAPIQuery({
    url: `/api/stories/search/${lineForSearch}`,
  });
  const [changeRating, isUpdateRating] = useAPIMethod({
    onComplete: refetchFoundStories,
    url: '/api/stories/add_rating',
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onChangeRating = async (storyId, newRating) => {
    setIdOfSelectedStory(storyId);
    await changeRating({ storyId, rating: newRating });
    setIdOfSelectedStory(null);
  };

  useEffect(() => {
    setIsSearchingStories(isLoading);
  }, [isLoading, setIsSearchingStories]);

  return (
    <>
      {error ? <Alert variant="danger">{error.message}</Alert> : null}
      {foundStories?.map((story) => {
        return (
          <Col key={story._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
            {idOfSelectedStory === story._id ? (
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
