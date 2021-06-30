import React, { useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAPIMethod from '../hooks/useAPIMethod';
import paths from '../router/paths';
import APIService from '../services/APIService';
import { EmailValidator, PasswordValidator } from '../utils/validators/Validator';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidatedEmail, setIsValidatedEmail] = useState(true);
  const [isValidatedPassword, setIsValidatedPassword] = useState(true);
  const [login, isLoginIn] = useAPIMethod({
    call: APIService.login,
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onChangeEmail = (e) => {
    if (!isValidatedEmail) {
      setIsValidatedEmail(EmailValidator(e.target.value));
    }
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    if (!isValidatedPassword) {
      setIsValidatedPassword(PasswordValidator(e.target.value));
    }
    setPassword(e.target.value);
  };

  const isValidEmail = (e) => {
    setIsValidatedEmail(EmailValidator(e.target.value));
  };

  const isValidPassword = (e) => {
    setIsValidatedPassword(PasswordValidator(e.target.value));
  };

  const Submit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <Link to={paths.signUp} className="float-right">
              <Button variant="outline-primary">Sing up</Button>
            </Link>
            <Form onSubmit={Submit}>
              <Card.Title>Sign in</Card.Title>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  style={isValidatedEmail ? {} : { border: '3px solid red' }}
                  value={email}
                  onChange={onChangeEmail}
                  onBlur={isValidEmail}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  style={isValidatedPassword ? {} : { border: '3px solid red' }}
                  value={password}
                  onChange={onChangePassword}
                  onBlur={isValidPassword}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                disabled={!isValidatedEmail || !isValidatedPassword || !email || !password || isLoginIn || false}
                variant="primary"
                type="submit"
                block
              >
                {isLoginIn ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="sr-only">Loading...</span>
                  </>
                ) : null}
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
