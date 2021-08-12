import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const userFollowingQuantityQuery = gql`
  query userFollowingQuantity($userId: ID!) {
    userFollowingQuantity(userId: $userId)
  }
`;

const useFollowingQuantity = (userId, options) => {
  const { loading, data, error, ...rest } = useQuery(userFollowingQuantityQuery, {
    variables: { userId },
    fetchPolicy: 'cache-and-network',
    ...options,
  });
  return [getFirstResult(data), { loading, error, ...rest }];
};

export default useFollowingQuantity;
