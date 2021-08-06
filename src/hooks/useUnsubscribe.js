import { gql, useMutation } from '@apollo/client';

const unsubscribeMutation = gql`
  mutation unsubscribe($authorId: ID!) {
    unsubscribe(authorId: $authorId)
  }
`;

const useUnsubscribe = (options) => {
  const [unsubscribe, rest] = useMutation(unsubscribeMutation, options);
  return [unsubscribe, rest];
};

export default useUnsubscribe;
