import { gql, useMutation } from '@apollo/client';
import { BOOKS } from '../constants/settings';

const changePrivacyOfBookMutation = gql`
  mutation changePrivacyOfBook($bookId: ID!, $isPrivate: Boolean!) {
    changePrivacyOfBook(bookId: $bookId, isPrivate: $isPrivate) {
      _id
    }
  }
`;

const changePrivacyOfStoryMutation = gql`
  mutation changePrivacyOfStory($storyId: ID!, $isPrivate: Boolean!) {
    changePrivacyOfStory(storyId: $storyId, isPrivate: $isPrivate) {
      _id
    }
  }
`;

const useChangePrivacyOfItem = (nameItem, options) => {
  const [changePrivacyOfItem, rest] = useMutation(
    nameItem === BOOKS ? changePrivacyOfBookMutation : changePrivacyOfStoryMutation,
    options
  );
  return [changePrivacyOfItem, rest];
};

export default useChangePrivacyOfItem;
