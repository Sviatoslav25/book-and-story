import { useParams } from 'react-router-dom';
import Profile from '../components/profile/Profile';
import useProfile from '../hooks/useProfile';

export default function UserProfile() {
  const params = useParams();
  const [profile, { loading: isLoading, error }] = useProfile(params.id);
  return <Profile profile={profile} isLoading={isLoading} error={error} />;
}
