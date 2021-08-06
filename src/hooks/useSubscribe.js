import { gql, useMutation } from '@apollo/client';

const subscribeMutation = gql`
  mutation subscribe($authorId: ID!) {
    subscribe(authorId: $authorId)
  }
`;

const useSubscribe = (options) => {
  const [subscribe, rest] = useMutation(subscribeMutation, options);
  return [subscribe, rest];
};

export default useSubscribe;
