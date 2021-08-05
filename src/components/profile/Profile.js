import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Alert, Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PROFILE_PHOTO } from '../../constants/settings';
import paths from '../../router/paths';

export default function Profile({ error, isLoading, profile, isMyProfile }) {
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  if (isLoading && !profile) {
    return <Container className="mt-4">Loading...</Container>;
  }
  return (
    <Container className="mt-4">
      <>
        <Row>
          <Col lg="3" md="3" sm="4" xs="5">
            <Card bg="dark" text="white">
              <Card.Img
                src={profile.profilePhoto || PROFILE_PHOTO}
                variant="top"
                style={{ maxWidth: 'auto', maxHeight: '400px', borderRadius: '50%' }}
                className="p-4"
              />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>{profile.nickname || 'none'}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="9" md="9" sm="8" xs="7">
            <Card>
              <Card.Body>
                <Card.Title
                  style={{ fontSize: '25px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
                >
                  {profile.nickname || 'none'}
                  {isMyProfile && (
                    <Link style={{ marginLeft: 'auto', marginRight: '5px', cursor: 'pointer' }} to={paths.editProfile}>
                      <FontAwesomeIcon title="Edit profile information" icon={faCog} />
                    </Link>
                  )}
                </Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>Full name: {profile.fullName || 'none'}</ListGroupItem>
                  <ListGroupItem>Email: {profile.email || 'none'}</ListGroupItem>
                  <ListGroupItem>Phone number: {profile.phoneNumber || 'none'}</ListGroupItem>
                  <ListGroupItem>About myself: {profile.aboutMyself || 'none'}</ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    </Container>
  );
}
