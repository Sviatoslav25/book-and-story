import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const myStoriesQuery = gql`
  query myStories {
    myStories {
      _id
      name
      shortDescription
      isPrivate
    }
  }
`;

const useMyStories = () => {
  const { loading, data, error, ...rest } = useQuery(myStoriesQuery, { fetchPolicy: 'cache-and-network' });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useMyStories;
