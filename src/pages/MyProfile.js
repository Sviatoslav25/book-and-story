import { Alert, Container } from 'react-bootstrap';
import Profile from '../components/profile/Profile';
import useMyProfile from '../hooks/useMyProfile';

export default function MyProfile() {
  const [profile, { loading: isLoading, error }] = useMyProfile();
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
  return <Profile profile={profile} isLoading={isLoading} error={error} isMyProfile />;
}
