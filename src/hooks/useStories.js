import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const storiesQuery = gql`
  query stories {
    stories {
      _id
      name
      shortDescription
      rating
    }
  }
`;

const useStories = (options) => {
  const { loading, data, error, ...rest } = useQuery(storiesQuery, { fetchPolicy: 'cache-and-network', ...options });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useStories;
