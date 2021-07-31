import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const favoritesStoriesQuery = gql`
  query favoritesStories {
    favoritesStories {
      _id
      name
      shortDescription
    }
  }
`;

const useFavoritesStories = (options) => {
  const { loading, data, error, ...rest } = useQuery(favoritesStoriesQuery, {
    fetchPolicy: 'cache-and-network',
    ...options,
  });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useFavoritesStories;
