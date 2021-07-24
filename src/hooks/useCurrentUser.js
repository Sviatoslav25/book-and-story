import { gql, useQuery } from '@apollo/client';

const meQuery = gql`
  query me {
    me {
      _id
      email
    }
  }
`;

const useCurrentUser = () => {
  const { loading, data, error, ...rest } = useQuery(meQuery);
  return [data?.me, { loading, error, ...rest }];
};

export default useCurrentUser;
