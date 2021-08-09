import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const myProfileQuery = gql`
  query myProfile {
    myProfile {
      nickname
      profilePhoto
      fullName
      email
      phoneNumber
      aboutMyself
    }
  }
`;

const useMyProfile = () => {
  const { loading, data, error, ...rest } = useQuery(myProfileQuery, { fetchPolicy: 'cache-and-network' });
  return [getFirstResult(data), { loading, error, ...rest }];
};

export default useMyProfile;
