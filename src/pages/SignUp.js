import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthForm from '../components/auth/AuthForm';
import useAPIMethod from '../hooks/useAPIMethod';
import paths from '../router/paths';
import APIService from '../services/APIService';

export default function SingUp() {
  const [registration, isRegistrationIn] = useAPIMethod({
    call: APIService.registration,
    onError: (e) => toast.error(e.message),
  });

  const Submit = ({ email, password }) => {
    registration({ email, password });
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
