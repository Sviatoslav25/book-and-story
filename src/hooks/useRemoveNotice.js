import { gql, useMutation } from '@apollo/client';
import { BOOKS } from '../constants/settings';

const removeNoticeForBookMutation = gql`
  mutation removeNoticeForBook($noticeId: ID!) {
    removeNoticeForBook(noticeId: $noticeId)
  }
`;

const removeNoticeForStoryMutation = gql`
  mutation removeNoticeForStory($noticeId: ID!) {
    removeNoticeForStory(noticeId: $noticeId)
  }
`;

const useRemoveNotice = (nameItem, props) => {
  const [removeNoticeForBook, rest] = useMutation(
    nameItem === BOOKS ? removeNoticeForBookMutation : removeNoticeForStoryMutation,
    props
  );
  return [removeNoticeForBook, rest];
};

export default useRemoveNotice;
