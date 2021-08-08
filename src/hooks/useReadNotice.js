import { gql, useMutation } from '@apollo/client';
import { BOOKS } from '../constants/settings';

const readNoticeForBookMutation = gql`
  mutation readNoticeForBook($noticeId: ID!) {
    readNoticeForBook(noticeId: $noticeId)
  }
`;

const readNoticeForStoryMutation = gql`
  mutation readNoticeForStory($noticeId: ID!) {
    readNoticeForStory(noticeId: $noticeId)
  }
`;

const useReadNotice = (nameItem, props) => {
  const [readNoticeForBook, rest] = useMutation(
    nameItem === BOOKS ? readNoticeForBookMutation : readNoticeForStoryMutation,
    props
  );
  return [readNoticeForBook, rest];
};

export default useReadNotice;
