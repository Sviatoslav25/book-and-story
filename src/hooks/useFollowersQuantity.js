import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const userFollowersQuantityQuery = gql`
  query userFollowersQuantity($userId: ID!) {
    userFollowersQuantity(userId: $userId)
  }
`;

const useFollowersQuantity = (userId, options) => {
  const { loading, data, error, ...rest } = useQuery(userFollowersQuantityQuery, {
    variables: { userId },
    fetchPolicy: 'cache-and-network',
    ...options,
  });
  return [getFirstResult(data), { loading, error, ...rest }];
};

export default useFollowersQuantity;
