import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../components/profile/Profile';
import UserBooks from '../components/users/UserBooks';
import UserStories from '../components/users/UserStories';
import useProfile from '../hooks/useProfile';
import ShowBooksOrStoriesManager from '../services/ShowBooksOrStoriesManager';

export default function UserProfile() {
  const [isBook, setIsBook] = useState(ShowBooksOrStoriesManager.isShowUserBooks());

  const switchToUserBooks = () => {
    ShowBooksOrStoriesManager.setIsUserBooks(true);
    setIsBook(true);
  };

  const switchToUserStories = () => {
    ShowBooksOrStoriesManager.setIsUserBooks(false);
    setIsBook(false);
  };

  const params = useParams();
  const [profile, { loading: isLoading, error }] = useProfile(params.id);
  return (
    <>
      <Profile profile={profile} isLoading={isLoading} error={error} />
      {isBook ? (
        <UserBooks switchToUserStories={switchToUserStories} userId={profile.userId} />
      ) : (
        <UserStories switchToUserBooks={switchToUserBooks} userId={profile.userId} />
      )}
    </>
  );
}
