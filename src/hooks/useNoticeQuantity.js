import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const noticeQuantityQuery = gql`
  query noticesQuantity {
    noticesQuantity
  }
`;

const useNoticeQuantity = () => {
  const { loading, data, error, ...rest } = useQuery(noticeQuantityQuery, { fetchPolicy: 'cache-and-network' });
  return [getFirstResult(data), { loading, error, ...rest }];
};

export default useNoticeQuantity;
