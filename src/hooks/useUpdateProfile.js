import { gql, useMutation } from '@apollo/client';

const updateProfileMutation = gql`
  mutation updateProfile($input: ProfileUpdateInput!) {
    updateProfile(input: $input) {
      _id
    }
  }
`;

const useUpdateProfile = (options) => {
  const [updateProfile, rest] = useMutation(updateProfileMutation, options);
  return [updateProfile, rest];
};

export default useUpdateProfile;
