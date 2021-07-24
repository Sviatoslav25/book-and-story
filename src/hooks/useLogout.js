import { gql, useMutation } from '@apollo/client';

const logoutMutation = gql`
  mutation logout($token: String!) {
    logout(token: $token)
  }
`;

const useLogout = (options) => {
  const [logout, rest] = useMutation(logoutMutation, options);
  return [logout, rest];
};

export default useLogout;
