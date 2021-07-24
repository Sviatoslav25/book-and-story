import { gql, useMutation } from '@apollo/client';

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

const useLogin = (options) => {
  const [login, rest] = useMutation(loginMutation, options);
  return [login, rest];
};

export default useLogin;
