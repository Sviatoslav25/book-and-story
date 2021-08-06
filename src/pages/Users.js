import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import useProfiles from '../hooks/useProfiles';
import UserCard from '../components/users/UserCard';

export default function Users() {
  const [users, { loading: isLoading, error, refetch: refetchUsers }] = useProfiles();

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  if (isLoading && !users) {
    return <Container className="mt-4">Loading...</Container>;
  }

  return (
    <Container className="mt-5">
      {users.map((user) => {
        return <UserCard key={user._id} user={user} refetchUsers={refetchUsers} />;
      })}
    </Container>
  );
}
