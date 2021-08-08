import { gql, useMutation } from '@apollo/client';

const removeNoticeForBookMutation = gql`
  mutation removeNoticeForBook($noticeId: ID!) {
    removeNoticeForBook(noticeId: $noticeId)
  }
`;

const useRemoveNotice = (props) => {
  const [removeNoticeForBook, rest] = useMutation(removeNoticeForBookMutation, props);
  return [removeNoticeForBook, rest];
};

export default useRemoveNotice;
