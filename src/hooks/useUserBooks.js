import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const userBooksQuery = gql`
  query userBooks($userId: ID!) {
    userBooks(userId: $userId) {
      _id
      name
      img
      description
      rating
    }
  }
`;

const useUserBooks = (userId) => {
  const { loading, data, error, ...rest } = useQuery(userBooksQuery, {
    variables: { userId },
    fetchPolicy: 'cache-and-network',
  });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useUserBooks;
