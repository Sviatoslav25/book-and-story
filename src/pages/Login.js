import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AuthForm from '../components/auth/AuthForm';
import useLogin from '../hooks/useLogin';
import AuthManager from '../services/AuthManager';
import { getFirstResult } from '../utils/graphql';

export default function Login() {
  const [login, { loading: isLoginIn }] = useLogin({
    onCompleted: (result) => {
      AuthManager.login(getFirstResult(result));
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const Submit = (data) => {
    login({ variables: data });
  };

  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <AuthForm Submit={Submit} isLoading={isLoginIn} isLoginForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
