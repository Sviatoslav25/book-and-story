import Profile from '../components/profile/Profile';
import useMyProfile from '../hooks/useMyProfile';

export default function MyProfile() {
  const [profile, { loading: isLoading, error }] = useMyProfile();
  return <Profile profile={profile} isLoading={isLoading} error={error} isMyProfile />;
}
