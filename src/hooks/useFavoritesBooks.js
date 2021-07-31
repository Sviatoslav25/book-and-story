import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const favoritesBooksQuery = gql`
  query favoritesBooks {
    favoritesBooks {
      _id
      name
      description
      img
    }
  }
`;

const useFavoritesBooks = (options) => {
  const { loading, data, error, ...rest } = useQuery(favoritesBooksQuery, {
    fetchPolicy: 'cache-and-network',
    ...options,
  });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useFavoritesBooks;
