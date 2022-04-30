import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <div className="container">
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="text"
            name="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button size="sm" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
