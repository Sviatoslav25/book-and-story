import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const profileQuery = gql`
  query profile($profileId: ID!) {
    profile(profileId: $profileId) {
      nickname
      profilePhoto
      fullName
      email
      phoneNumber
      aboutMyself
      userId
    }
  }
`;

const useProfile = (profileId) => {
  const { loading, data, error, ...rest } = useQuery(profileQuery, {
    fetchPolicy: 'cache-and-network',
    variables: { profileId },
  });
  return [getFirstResult(data), { loading, error, ...rest }];
};

export default useProfile;
