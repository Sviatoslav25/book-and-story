import { gql, useMutation } from '@apollo/client';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthForm from '../components/auth/AuthForm';
import paths from '../router/paths';
import AuthManager from '../services/AuthManager';
import { getFirstResult } from '../utils/graphql';

const registrationMutation = gql`
  mutation registration($email: String!, $password: String!) {
    registration(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

const useRegistration = (options) => {
  const [registration, rest] = useMutation(registrationMutation, options);
  return [registration, rest];
};

export default function SingUp() {
  const [registration, { loading: isRegistrationIn }] = useRegistration({
    onCompleted: (result) => {
      AuthManager.login(getFirstResult(result));
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const Submit = (data) => {
    registration({ variables: data });
  };

  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <Link to={paths.login} className="float-right">
              <Button variant="outline-primary">Sing in</Button>
            </Link>
            <AuthForm Submit={Submit} isLoading={isRegistrationIn} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
