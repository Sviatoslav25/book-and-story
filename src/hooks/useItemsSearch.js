import { gql, useQuery } from '@apollo/client';
import { BOOKS } from '../constants/settings';
import { getFirstResult } from '../utils/graphql';

const storiesSearchQuery = gql`
  query storiesSearch($searchString: String!) {
    storiesSearch(searchString: $searchString) {
      _id
      name
      shortDescription
      rating
    }
  }
`;

const booksSearchQuery = gql`
  query booksSearch($searchString: String!) {
    booksSearch(searchString: $searchString) {
      _id
      name
      description
      rating
      img
    }
  }
`;

const useItemsSearch = (nameItem, searchString, options) => {
  const { loading, data, error, ...rest } = useQuery(nameItem === BOOKS ? booksSearchQuery : storiesSearchQuery, {
    variables: { searchString },
    fetchPolicy: 'cache-and-network',
    ...options,
  });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useItemsSearch;
