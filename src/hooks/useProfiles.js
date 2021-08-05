import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const profilesQuery = gql`
  query profiles {
    profiles {
      _id
      nickname
      email
      profilePhoto
      aboutMyself
    }
  }
`;

const useProfiles = () => {
  const { loading, data, error, ...rest } = useQuery(profilesQuery, { fetchPolicy: 'cache-and-network' });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useProfiles;
