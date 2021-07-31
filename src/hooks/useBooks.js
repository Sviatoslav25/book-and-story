import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const booksQuery = gql`
  query Books {
    books {
      _id
      name
      description
      rating
      img
      userCanAddRating
    }
  }
`;

const useBooks = () => {
  const { loading, data, error, ...rest } = useQuery(booksQuery, { fetchPolicy: 'cache-and-network' });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useBooks;
