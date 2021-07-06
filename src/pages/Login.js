import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthForm from '../components/auth/AuthForm';
import useAPIMethod from '../hooks/useAPIMethod';
import paths from '../router/paths';
import APIService from '../services/APIService';

export default function Login() {
  const [login, isLoginIn] = useAPIMethod({
    call: APIService.login,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const Submit = ({ email, password }) => {
    login({ email, password });
  };
  const isLoginForm = true;

  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <Link to={paths.signUp} className="float-right">
              <Button variant="outline-primary">Sing up</Button>
            </Link>
            <AuthForm Submit={Submit} isLoading={isLoginIn} isLoginForm={isLoginForm} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
