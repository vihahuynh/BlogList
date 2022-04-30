import React, { useEffect, useState } from "react";
import userService from "../services/user";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Users = () => {
  const userStyle = {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#D0E8F2",
    borderRadius: 15,
    color: "#456268",
  };

  const linkStyle = {
    color: "#456268",
    fontWeight: "bold",
    padding: 10,
  };

  const [users, setUsers] = useState([]);
  useEffect(
    () => userService.getAll().then((returnedUsers) => setUsers(returnedUsers)),
    []
  );

  return (
    <div className="container">
      <h2>Users</h2>
      <Container>
        {users.map((user) => (
          <Row style={userStyle} key={user.id}>
            <Col lg={11}>
              <Link style={linkStyle} to={`/users/${user.id}`}>
                {user.username}
              </Link>
            </Col>
            <Col lg={1}>{user.blogs.length}</Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Users;
