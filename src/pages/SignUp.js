import { gql, useMutation } from '@apollo/client';
import { Card, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AuthForm from '../components/auth/AuthForm';
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
            <AuthForm Submit={Submit} isLoading={isRegistrationIn} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
