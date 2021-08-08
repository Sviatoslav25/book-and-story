import { gql, useMutation } from '@apollo/client';

const readNoticeForBookMutation = gql`
  mutation readNoticeForBook($noticeId: ID!) {
    readNoticeForBook(noticeId: $noticeId)
  }
`;

const useReadNoticeForBook = (props) => {
  const [readNoticeForBook, rest] = useMutation(readNoticeForBookMutation, props);
  return [readNoticeForBook, rest];
};

export default useReadNoticeForBook;
