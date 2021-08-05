import React from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfileForm from '../components/profileForm.js/ProfileForm';
import useProfile from '../hooks/useProfile';
import useUpdateProfile from '../hooks/useUpdateProfile';
import paths from '../router/paths';

export default function EditProfile() {
  const history = useHistory();
  const [profile, { loading: isLoading, error }] = useProfile();
  const [editProfile] = useUpdateProfile({
    onCompleted: () => {
      toast.success('Profile updated successfully');
      history.push(paths.profile);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit = (values) => {
    editProfile({ variables: { input: values } });
  };

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  if (isLoading && !profile) {
    return <Container className="mt-4">loading...</Container>;
  }

  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <ProfileForm onSubmit={onSubmit} initialValues={profile} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
