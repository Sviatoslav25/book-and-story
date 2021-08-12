import { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Profile from '../components/profile/Profile';
import UserBooks from '../components/users/UserBooks';
import UserStories from '../components/users/UserStories';
import useProfile from '../hooks/useProfile';
import ShowBooksOrStoriesManager from '../services/ShowBooksOrStoriesManager';

export default function UserProfile() {
  const [isBook, setIsBook] = useState(ShowBooksOrStoriesManager.isShowUserBooks());
  const params = useParams();
  const [profile, { loading: isLoading, error }] = useProfile(params.id);

  const switchToUserBooks = () => {
    ShowBooksOrStoriesManager.setIsUserBooks(true);
    setIsBook(true);
  };

  const switchToUserStories = () => {
    ShowBooksOrStoriesManager.setIsUserBooks(false);
    setIsBook(false);
  };

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  if (isLoading && !profile) {
    return <Container className="mt-4">Loading...</Container>;
  }
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
